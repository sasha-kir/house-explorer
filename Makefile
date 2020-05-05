deploy:
	@echo "removing old version"
	@rm -r /var/www/html/house-explorer
	@echo "building app"
	@npm run build
	@echo "copying files"
	@mkdir /var/www/html/house-explorer
	@cp -r build/* /var/www/html/house-explorer/
	@echo "\033[0;32mDone! \033[0m"
