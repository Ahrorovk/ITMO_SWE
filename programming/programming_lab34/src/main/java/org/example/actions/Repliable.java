package org.example.actions;

import org.example.characters.AliveCreation;
import org.example.exceptions.NoExplorerFoundException;
import org.example.objects.Food;

public interface Repliable {
    String reply(AliveCreation creation,Boolean isReply) throws NoExplorerFoundException;
}
