<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>XML Sitemap (MHX)</title>
                <style type="text/css">
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background-color: #f0f4f8;
                    }
                    h1 {
                        color: #1a73e8;
                        border-bottom: 2px solid #1a73e8;
                        padding-bottom: 10px;
                    }
                    table {
                        width: 90%;
                        border-collapse: collapse;
                        margin-top: 20px;
                        background-color: white;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    th, td {
                        border: 1px solid #dee2e6;
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #343a40;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f8f9fa;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>🌐 XML Sitemap: <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:loc"/></h1>
                <p>Yeh sitemap aapki website ke saare pages ko Search Engines (jaise Google) ke liye list karta hai.</p>
                <table>
                    <tr>
                        <th>URL Location</th>
                        <th>Change Frequency</th>
                        <th>Priority</th>
                    </tr>
                    <xsl:apply-templates select="sitemap:urlset/sitemap:url"/>
                </table>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="sitemap:url">
        <tr>
            <td>
                <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
            </td>
            <td><xsl:value-of select="sitemap:changefreq"/></td>
            <td><xsl:value-of select="sitemap:priority"/></td>
        </tr>
    </xsl:template>
</xsl:stylesheet>