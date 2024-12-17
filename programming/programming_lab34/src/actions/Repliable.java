package actions;

import characters.AliveCreation;
import exceptions.NoExplorerFoundException;

public interface Repliable {
    String reply(AliveCreation creation,Boolean isReply) throws NoExplorerFoundException;
}
