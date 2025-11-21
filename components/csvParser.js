export const parseCsv = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      if (char === '"') {
        if (inQuotes && nextChar === '"') { current += '"'; i++; } 
        else { inQuotes = !inQuotes; }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else { current += char; }
    }
    result.push(current.trim());
    return result;
  };

  // Headers ko parse karna aur spaces ko underscore se replace karna
  const headers = parseCSVLine(lines[0]).map(h => h.trim().replace(/ /g, '_'));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || values.every(v => !v)) continue;
    
    let item = {};
    headers.forEach((header, index) => { 
        if(header) {
            // Hum Backticks ka istemal kar rahe hain kyunki headers mein special character (&) hai
            item[header] = values[index] || ''; 
        }
    });
    
    // 🛑 FIXED FILTERING LOGIC 🛑
    // Ab hum Title/Client_Name ki hardcoded keys ki bajaye,
    // yeh check kar rahe hain ki row mein koi bhi value maujood hai ya nahi (taake data reject na ho).
    const hasContent = Object.values(item).some(value => value && value.trim() !== '');

    if (hasContent) {
        // Option 1: Aapke naye column names (Identity & Origin / Inherent Flaw) ko Title/ClientName se map kar dein
        item.Title = item['Identity_&_Origin']; 
        item.Client_Name = item['Inherent_Flaw'];
        
        // Option 2: Agar kisi bhi value mein data hai, to us row ko push kar dein.
        data.push(item);
    }
  }
  return data;
};