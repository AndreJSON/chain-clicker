.DEFAULT_GOAL := help

help:
	@echo "Use 'make pack' or 'make run'."

pack:
	jar cvfm0 Clicker.jar Manifest.txt Clicker.class InputNode.class

run:
	java -jar Clicker.jar
