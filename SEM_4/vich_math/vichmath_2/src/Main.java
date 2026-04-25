public class Main {
    public static void main(String[] args) {
        String name = "Aziza";
        int age = 12;
        double zp = 400.0;
        int day , month = 341, year = 2;
        final int limit = 5;
        Person person = new Person();
        person.name = "Robiya";
        person.printName();
        Workers w = new Workers();
        w.init();
        w.printWorkersName();
//         if(person.name == "Robiya"){
//             System.out.println("Hello " + person.name);
//         }else if(person.name != "Aziza"){
//             System.out.println("Hello person whose name is not Aziza or Robiya");
//         } else {
//             System.out.println("Hello Aziza");
//         }
    }
}
