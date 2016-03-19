#
# Makefile
#

# help:
# 	@echo "init   install all dependences"
#	@echo "debug  build for debug"
#	@echo "build  build for production"
#	@echo "dev    run dev server"

debug:
	webpack --progress --hide-modules

dev:
	webpack-dev-server --inline --hot --host 0.0.0.0 --quiet

build:
	NODE_ENV=production webpack --progress --hide-modules

init:
	sudo npm install
	bower install
