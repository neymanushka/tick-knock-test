export default class Vector2 {
	x: number;
	y: number;

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	mul(scalar: number): Vector2 {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	rotate(alpha: number): Vector2 {
		const cos = Math.cos(alpha);
		const sin = Math.sin(alpha);
		const x = this.x * cos - this.y * sin;
		const y = this.x * sin + this.y * cos;
		return new Vector2(x, y);
	}

	add(v: Vector2): Vector2 {
		return new Vector2(v.x + this.x, v.y + this.y);
	}

	sub(v: Vector2): Vector2 {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	distance(v: Vector2): number {
		const x = this.x - v.x;
		const y = this.y - v.y;
		return Math.sqrt(x * x + y * y);
	}

	length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	norm(): Vector2 {
		const len = this.length();
		return len ? new Vector2(this.x / len, this.y / len) : new Vector2();
	}
}
