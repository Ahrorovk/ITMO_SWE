package approximation

import kotlin.math.*
import kotlin.test.*
import org.junit.Test

class ApproximationTest {

    // Known data: exact linear y = 2x + 1 → coefficients must be a=2, b=1, S≈0
    private val xsLinear = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
    private val ysLinear = xsLinear.map { 2.0 * it + 1.0 }.toDoubleArray()

    @Test
    fun `gaussian elimination solves 2x2 system`() {
        val A = arrayOf(doubleArrayOf(2.0, 1.0), doubleArrayOf(1.0, 3.0))
        val b = doubleArrayOf(5.0, 10.0)
        val x = gaussianElimination(A, b)
        assertEquals(1.0, x[0], 1e-9)
        assertEquals(3.0, x[1], 1e-9)
    }

    @Test
    fun `gaussian elimination solves 3x3 system`() {
        val A = arrayOf(
            doubleArrayOf(2.0, 1.0, -1.0),
            doubleArrayOf(-3.0, -1.0, 2.0),
            doubleArrayOf(-2.0, 1.0, 2.0)
        )
        val b = doubleArrayOf(8.0, -11.0, -3.0)
        val x = gaussianElimination(A, b)
        assertEquals(2.0, x[0], 1e-9)
        assertEquals(3.0, x[1], 1e-9)
        assertEquals(-1.0, x[2], 1e-9)
    }

    @Test
    fun `linear approximation of exact line has near-zero S`() {
        val result = linearApproximation(xsLinear, ysLinear)
        // coef[0] = b ~ 1.0, coef[1] = a ~ 2.0
        assertEquals(1.0, result.coefficients[0], 1e-6, "intercept b")
        assertEquals(2.0, result.coefficients[1], 1e-6, "slope a")
        assertTrue(result.S < 1e-10, "S should be near zero for exact data, got ${result.S}")
    }

    @Test
    fun `poly2 approximation of exact quadratic has near-zero S`() {
        val xs = doubleArrayOf(0.0, 1.0, 2.0, 3.0, 4.0, 5.0)
        val ys = xs.map { x -> 3 * x * x - 2 * x + 1.0 }.toDoubleArray()
        val result = poly2Approximation(xs, ys)
        // coef[0]=1, coef[1]=-2, coef[2]=3
        assertEquals(1.0, result.coefficients[0], 1e-6)
        assertEquals(-2.0, result.coefficients[1], 1e-6)
        assertEquals(3.0, result.coefficients[2], 1e-6)
        assertTrue(result.S < 1e-10)
    }

    @Test
    fun `poly3 approximation of exact cubic has near-zero S`() {
        val xs = doubleArrayOf(0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0)
        val ys = xs.map { x -> x * x * x - x * x + 2 * x - 3 }.toDoubleArray()
        val result = poly3Approximation(xs, ys)
        assertEquals(-3.0, result.coefficients[0], 1e-4)
        assertEquals(2.0, result.coefficients[1], 1e-4)
        assertEquals(-1.0, result.coefficients[2], 1e-4)
        assertEquals(1.0, result.coefficients[3], 1e-4)
        assertTrue(result.S < 1e-6)
    }

    @Test
    fun `pearson correlation of perfect linear data equals 1`() {
        val r = pearsonR(xsLinear, ysLinear)
        assertEquals(1.0, r, 1e-9)
    }

    @Test
    fun `pearson correlation of negatively correlated data equals -1`() {
        val xs = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
        val ys = doubleArrayOf(10.0, 8.0, 6.0, 4.0, 2.0)
        val r = pearsonR(xs, ys)
        assertEquals(-1.0, r, 1e-9)
    }

    @Test
    fun `exponential approximation recovers ae^bx`() {
        val xs = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
        val a = 2.0; val b = 0.5
        val ys = xs.map { a * exp(b * it) }.toDoubleArray()
        val result = exponentialApproximation(xs, ys)
        assertEquals(a, result.coefficients[0], 1e-5, "a coefficient")
        assertEquals(b, result.coefficients[1], 1e-5, "b coefficient")
        assertTrue(result.S < 1e-8)
    }

    @Test
    fun `power approximation recovers ax^b`() {
        val xs = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
        val a = 3.0; val b = 2.0
        val ys = xs.map { a * it.pow(b) }.toDoubleArray()
        val result = powerApproximation(xs, ys)
        assertEquals(a, result.coefficients[0], 1e-5)
        assertEquals(b, result.coefficients[1], 1e-5)
        assertTrue(result.S < 1e-6)
    }

    @Test
    fun `logarithmic approximation recovers a ln(x) + b`() {
        val xs = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
        val a = 4.0; val b = 1.0
        val ys = xs.map { a * ln(it) + b }.toDoubleArray()
        val result = logarithmicApproximation(xs, ys)
        assertEquals(b, result.coefficients[0], 1e-5, "b coefficient")
        assertEquals(a, result.coefficients[1], 1e-5, "a coefficient")
        assertTrue(result.S < 1e-8)
    }

    @Test
    fun `runAllApproximations returns 6 results sorted by stdDeviation`() {
        val xs = doubleArrayOf(0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0)
        val ys = xs.map { x -> 2 * x / (x.pow(4.0) + 1) }.toDoubleArray()
        val results = runAllApproximations(xs, ys)
        assertTrue(results.size >= 4, "Should produce at least 4 results (log/power skip x=0)")
        for (i in 0 until results.size - 1) {
            assertTrue(results[i].stdDeviation <= results[i + 1].stdDeviation,
                "Results should be sorted ascending by stdDeviation")
        }
    }

    @Test
    fun `standard deviation equals sqrt of S over n`() {
        val xs = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
        val ys = doubleArrayOf(2.1, 3.9, 6.1, 7.9, 10.1)
        val result = linearApproximation(xs, ys)
        val expectedDelta = sqrt(result.S / xs.size)
        assertEquals(expectedDelta, result.stdDeviation, 1e-10)
    }

    @Test
    fun `variant 1 data has 11 points`() {
        val xs = DoubleArray(11) { i -> i * 0.2 }
        val ys = xs.map { x -> 2 * x / (x.pow(4.0) + 1) }.toDoubleArray()
        assertEquals(11, xs.size)
        assertEquals(11, ys.size)
        // Check specific values
        assertEquals(0.0, ys[0], 1e-10)         // x=0 → y=0
        assertEquals(1.0, ys[5], 1e-10)         // x=1 → y=1
        assertEquals(0.235294, ys[10], 1e-5)    // x=2 → y=4/17≈0.235294
    }

    @Test
    fun `R2 equals 1 for perfect fit`() {
        val xs = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0)
        val ys = xs.map { 2.0 * it + 1.0 }.toDoubleArray()
        val result = linearApproximation(xs, ys)
        assertEquals(1.0, result.r2, 1e-6)
    }
}
