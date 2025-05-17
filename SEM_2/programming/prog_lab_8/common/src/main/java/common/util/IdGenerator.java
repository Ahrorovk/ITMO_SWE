package common.util;

import java.util.concurrent.atomic.AtomicLong;

public final class IdGenerator {
    private static final AtomicLong SEQ = new AtomicLong(0);
    public static long next() {
        return SEQ.incrementAndGet();
    }

    public static void syncWith(long lastId) {
        SEQ.updateAndGet(old -> Math.max(old, lastId));
    }

    private IdGenerator() {}
}
