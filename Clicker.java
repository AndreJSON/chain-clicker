import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class Clicker {
	Robot robot;
	Scanner scan;

	public Clicker() throws Exception {
		robot = new Robot();
		robot.setAutoWaitForIdle(true);
		scan = new Scanner(System.in);
		ArrayList<InputNode> chain = readChain();
		iterateChain(chain);
	}

	private void iterateChain(ArrayList<InputNode> chain) throws Exception {
		while(true) {
			for(InputNode node : chain) {
				clickPoint(node.getPoint(), node.getMillisToNext());
			}
		}
	}

	private ArrayList<InputNode> readChain() {
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
		robot.delay(wait);
	}

	public static void main(String[] args) {
		try {
			new Clicker();
		} catch(Exception e) {
			System.out.println(e);
		}
	}
}