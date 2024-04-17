const submitContactForm = (e) => {
    e.preventDefault(); //don't refresh the page
    
    const form = document.getElementById("contact-me");
    const FirstName = form.elements["first-name"].value;
    console.log(FirstName);
    const LastName = form.elements["last-name"].value;
    console.log(LastName)
    const ContactInfo = form.elements["contact-info"].value;
    console.log(ContactInfo);
    const EventType = form.elements["event-type"].value;
    console.log(EventType);
    const Questions = form.elements["questions"].value;
    console.log(Questions);
    
    const mainSection = document.createElement("section");
    //adding more to this later


    mainSection.append("Success! Your Contact Has Been Submitted");
    const firstName = document.createElement("p");
    firstName.innerHTML = "First Name: " + FirstName;
    mainSection.append(firstName);
    const lastName = document.createElement("p");
    lastName.innerHTML = "Last Name: " + LastName;
    mainSection.append(lastName);
    const contactInfo = document.createElement("p");
    contactInfo.innerHTML = "Contact Information: " + ContactInfo;
    mainSection.append(contactInfo);
    const eventType = document.createElement("p");
    eventType.innerHTML = "Event Type: " + EventType;
    mainSection.append(eventType);
    const questions = document.createElement("p");
    questions.innerHTML = "Questions: " + Questions;
    mainSection.append(questions);

    document.getElementById("data-section").append(mainSection);

    


}

document.getElementById("contact-me").onsubmit = submitContactForm;