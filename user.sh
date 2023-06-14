#cloud-boothook
#!/bin/bash

sudo yum update -y
sudo yum install git -y
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd

sudo cd /var/www/html/

# Clone the repository
sudo git clone https://github.com/LexJacob/Proj3.git .

# Move the index.html file to the root directory
sudo mv -v /var/www/html/webpage/index.html /var/www/html/index.html

# Copy all the assets and webpages to the root directory
sudo cp -r /var/www/html/webpage/* /var/www/html/

# Remove the .git folder
sudo rm -rf /var/www/html/.git

sudo systemctl restart httpd

--//
