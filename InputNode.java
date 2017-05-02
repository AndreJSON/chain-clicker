import java.awt.*;

public class InputNode {
	private Point point;
	private int millisToNext;

	public InputNode(Point point, int millisToNext) {
		this.point = point;
		this.millisToNext = millisToNext;
	}

	public int getMillisToNext() {
		return millisToNext;
	}

	public Point getPoint() {
		return point;
	}
}