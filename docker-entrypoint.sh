
#!/bin/sh

# Start the backend API server in the background
cd /app/api && node index.js &

# Start the frontend server
cd /app && npx serve -s dist -l 8080

# Keep the container running
wait
