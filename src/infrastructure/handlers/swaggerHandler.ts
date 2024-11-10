import fs from 'fs';
import path from 'path';

export const swaggerDocs = async () => {
    const filePath = path.join(__dirname, '../../../swagger.yml');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/yaml',
        },
        body: fileContent,
    };
};

export const swaggerUI = async () => {
    const swaggerHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Swagger UI</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
      <script>
        const ui = SwaggerUIBundle({
          url: '/swagger',
          dom_id: '#swagger-ui',
        });
      </script>
    </body>
    </html>
  `;

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: swaggerHtml,
    };
};