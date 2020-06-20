deploy:
	@echo "installing dependencies"
	@npm install
	@echo "building app"
	@npm run build
	@echo "removing old version"
	@rm -r ~/static-files/house-explorer
	@echo "copying files"
	@mkdir ~/static-files/house-explorer
	@cp -r build/* ~/static-files/house-explorer/
	@echo "\033[0;32mDone! \033[0m"