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

  const headers = parseCSVLine(lines[0]).map(h => h.trim().replace(/ /g, '_'));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || values.every(v => !v)) continue;
    let item = {};
    headers.forEach((header, index) => { if(header) item[header] = values[index] || ''; });
    
    const title = item.Title || item.Titless || item.title;
    if (title || item.Client_Name) {
        item.Title = title; 
        data.push(item);
    }
  }
  return data;
};