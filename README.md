# Sherdog API (Express)

Jednoduché REST API postavené na [valish/sherdog-api](https://github.com/valish/sherdog-api).

## Deploy na Render

1. Nahraj tento projekt na GitHub
2. Choď na https://render.com → New Web Service → Import from GitHub
3. Nastav:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Po deployi získaj URL ako:
   ```
   https://sherdog-api-david.onrender.com/fighter/Conor-McGregor-29688
   ```

## Lokálny test

```bash
npm install
node index.js
```

Potom choď na:  
http://localhost:3000/fighter/Conor-McGregor-29688
