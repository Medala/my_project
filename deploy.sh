echo "Switching to production"
git checkout prod

 echo "Building app..."
 npm run build

echo "Deploying files to server..."
scp -r dist/* sarah@172.105.61.44:/var/www/frontend/

echo "Done!"