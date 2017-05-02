.DEFAULT_GOAL := help

help:
	@echo "Use 'make pack' or 'make run'."

pack: compile
	jar cvfm0 Clicker.jar Manifest.txt Clicker.class InputNode.class

compile:
	javac Clicker.java

run:
	java -jar Clicker.jar
