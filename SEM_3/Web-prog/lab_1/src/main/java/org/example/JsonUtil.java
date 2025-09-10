package org.example;

import java.util.List;
import java.util.Locale;
//
//public class JsonUtil {
//    public static String esc(String s) {
//        if (s == null) return "null";
//        StringBuilder sb = new StringBuilder();
//        for (char c : s.toCharArray()) {
//            switch (c) {
//                case '"': sb.append("\\\""); break;
//                case '\\': sb.append("\\\\"); break;
//                case '\n': sb.append("\\n"); break;
//                case '\r': sb.append("\\r"); break;
//                case '\t': sb.append("\\t"); break;
//                default:
//                    if (c < 32) sb.append(String.format("\\u%04x", (int)c));
//                    else sb.append(c);
//            }
//        }
//        return sb.toString();
//    }
//    public static String str(String s) { return s == null ? "null" : ('"' +
//            esc(s) + '"'); }
//    public static String num(Double d) { return d == null ? "null" :
//            String.format(Locale.US, "%s", d); }
//    public static String wrap(String k, String v) { return '"' + esc(k) +
//            '"' + ':' + v; }
//    public static String array(List<Main.Result> list) {
//        StringBuilder sb = new StringBuilder("[");
//        boolean first = true;
//        for (Main.Result r : list) {
//            if (!first) sb.append(',');
//            first = false;
//            sb.append('{')
//                    .append(wrap("time", str(r.time))).append(',')
//                    .append(wrap("execMs", String.format(Locale.US, "%.3f",
//                            r.execMs))).append(',')
//                    .append(wrap("x", num(r.x))).append(',')
//                    .append(wrap("y", num(r.y))).append(',')
//                    .append(wrap("r", num(r.r))).append(',')
//                    .append(wrap("ok", String.valueOf(r.ok))).append(',')
//                    .append(wrap("hit", String.valueOf(r.hit))).append(',')
//                    .append(wrap("error", str(r.error)))
//                    .append('}');
//        }
//        sb.append(']');
//        return sb.toString();
//    }
//}
//
