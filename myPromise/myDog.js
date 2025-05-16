// Dog.js
class Dog {
    // Constructor - initializes the object
    constructor(name, breed, age) {
      this.name = name;
      this.breed = breed;
      this.age = age;
      this.isGoodBoy = true;
    }
    
    // Instance methods
    bark() {
      return `${this.name} says: Woof! Woof!`;
    }
    
    eat(food) {
      return `${this.name} is eating ${food}`;
    }
    
    birthday() {
      this.age += 1;
      return `${this.name} is now ${this.age} years old!`;
    }
    
    // Getter method
    get info() {
      return `${this.name} is a ${this.age} year old ${this.breed}`;
    }
    
    // Static method (belongs to the class, not instances)
    static compareAges(dog1, dog2) {
      if (dog1.age > dog2.age) {
        return `${dog1.name} is older than ${dog2.name}`;
      } else if (dog1.age < dog2.age) {
        return `${dog1.name} is younger than ${dog2.name}`;
      } else {
        return `${dog1.name} and ${dog2.name} are the same age`;
      }
    }
  }
  
  // Creating instances of the Dog class
  const max = new Dog('Max', 'Golden Retriever', 3);
  const bella = new Dog('Bella', 'Beagle', 5);
  
  // Using instance methods
  console.log(max.bark());  // Max says: Woof! Woof!
  console.log(max.eat('dog food'));  // Max is eating dog food
  console.log(max.birthday());  // Max is now 4 years old!
  
  // Using getter
  console.log(max.info);  // Max is a 4 year old Golden Retriever
  
  // Using static method
  console.log(Dog.compareAges(max, bella));  // Max is younger than Bella
  
  // Inheritance - creating a subclass
  class ServiceDog extends Dog {
    constructor(name, breed, age, trainingType) {
      // Call the parent constructor
      super(name, breed, age);
      this.trainingType = trainingType;
    }
    
    performDuty() {
      return `${this.name} is helping as a ${this.trainingType} dog`;
    }
    
    // Override the parent method
    bark() {
      return `${this.name} barks quietly because they're well trained`;
    }
  }
  
  const buddy = new ServiceDog('Buddy', 'German Shepherd', 4, 'guide');
  console.log(buddy.performDuty());  // Buddy is helping as a guide dog
  console.log(buddy.bark());  // Buddy barks quietly because they're well trained
  console.log(buddy.info);  // Buddy is a 4 year old German Shepherd