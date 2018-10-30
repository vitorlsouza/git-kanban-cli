all: configure

shellCheck:
	./script-check.sh

configure:
	sudo ./configure.sh
