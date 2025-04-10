package common.apk.model;

import java.io.Serializable;

public interface Command extends Serializable {
    String getName();
    String getDescription();
    Object execute();
} 