import java.awt.*;
import java.awt.event.*;
import java.util.*;
import java.io.*;

public class Clicker {
	static final int NORMAL = 1, STORE = 2, LOAD = 3;
	Robot robot;
	Scanner scan;

	public Clicker() throws Exception {
		init();
		ArrayList<InputNode> chain;
		String name;
		int mode = getMode();
		switch(mode) {
			case NORMAL:	chain = createChain();
							iterateChain(chain);
							break;
			case STORE:		System.out.println("Name the chain:");
							name = scan.nextLine();
							chain = createChain();
							storeChain(chain, name+".chain");
							break;
			case LOAD:		System.out.println("Name the chain:");
							name = scan.nextLine();
							chain = loadChain(name+".chain");
							iterateChain(chain);
							break;
			default: System.exit(-1);
		}
	}

	private void iterateChain(ArrayList<InputNode> chain) throws Exception {
		while(true) {
			for(InputNode node : chain) {
				clickPoint(node.getPoint(), node.getMillisToNext());
			}
		}
	}

	private ArrayList<InputNode> createChain() {
		System.out.println("How many nodes should the chain have?");
		ArrayList<InputNode> chain = new ArrayList<>();
		int input, chainLength = scan.nextInt();
		for(int i = 0; i < chainLength; i++) {
			System.out.print("Enter delay after node " + (i + 1) + ": ");
			input = scan.nextInt();
			chain.add(new InputNode(getPoint(), input));
		}

		return chain;
	}

	private Point getPoint() {
		return MouseInfo.getPointerInfo().getLocation();
	}

	private void clickPoint(Point p, int wait) throws Exception {
		robot.mouseMove((int)p.getX(),(int)p.getY());
		robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
		robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
		Thread.sleep(wait);
	}

	private void storeChain(ArrayList<InputNode> chain, String name) throws Exception {
		BufferedWriter writer = new BufferedWriter(new FileWriter(name));
		for(InputNode node : chain) {
			writer.write(node.toString() + "\n");
		}
		writer.close();
	}

	private ArrayList<InputNode> loadChain(String name) throws Exception {
		ArrayList<InputNode> chain = new ArrayList<>();
		BufferedReader reader = new BufferedReader(new FileReader(name));
		String line;
		while((line = reader.readLine()) != null) {
			chain.add(new InputNode(line));
		}
		return chain;
	}

	private int getMode() {
		System.out.println("########################");
		System.out.println("#   [1] Normal mode    #");
		System.out.println("#   [2] Create chain   #");
		System.out.println("#   [3] Load chain     #");
		System.out.println("########################");
		int mode = scan.nextInt();
		scan.nextLine(); //Consume the trailing newline from nextInt()
		return mode;
	}

	private void init() throws Exception {
		robot = new Robot();
		robot.setAutoWaitForIdle(true);
		scan = new Scanner(System.in);
	}

	public static void main(String[] args) {
		try {
			new Clicker();
		} catch(Exception e) {
			System.out.println(e);
		}
	}	
}