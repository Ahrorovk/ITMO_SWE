public class Workers {
    Person[] workers = new Person[3];
    public void init(){
        workers[0] = new Person();
        workers[0].name = "Aziza";
        workers[1] = new Person();
        workers[1].name = "Robiya";
        workers[2] = new Person();
        workers[2].name = "Akmal";
    }
    public void printWorkersName(){
        for(int i=0;i<workers.length;i++){
            System.out.println("Работник "+(i+1)+ ": "+workers[i].name);
        }
    }
}
