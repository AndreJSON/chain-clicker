import java.awt.*;

public class InputNode {
	private Point point;
	private int millisToNext;

	public InputNode(Point point, int millisToNext) {
		this.point = point;
		this.millisToNext = millisToNext;
	}

	/**
	 * Intatiate an InputNode from a string representation.
	 * For more information on the format, view the toString method.
	 */
	public InputNode(String s) {
		String[] params = s.split("\\s");
		this.point = new Point(Integer.parseInt(params[0]), Integer.parseInt(params[1]));
		this.millisToNext = Integer.parseInt(params[2]);
	}

	public int getMillisToNext() {
		return millisToNext;
	}

	public Point getPoint() {
		return point;
	}

	public String toString() {
		return "" + (int)point.getX() + " " + (int)point.getY() + " " + millisToNext;
	}
}