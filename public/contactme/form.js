const submitContactForm = (e) => {
    e.preventDefault(); //don't refresh the page
    
    const form = document.getElementById("contact-me");
    const FirstName = form.elements["firstName"].value;
    const Lastname = form.elements["lastName"].value;
    const Reason = form.elements["reason"].value;
    const Questions = form.elements("questions").value;
    
    const mainSection = document.createElement("section");
    //adding more to this later

    console.log("First Name: " + firstName + "Last Name: : " + lastName + "Reasons: " + reason + "Questions: " + questions);

    formSection.append("Success!");
    const title = document.createElement("p");
    title.innerHTML = "First Name: " + FirstName;
    formSection.append(title);
    const lastName = document.createElement("p");
    lastName.innerHTML = "Last Name: " + LastName;
    formSection.append(lastName);
    const reasons = document.createElement("p");
    reasons.innerHTML = "Reason: " + Reasons;
    formSection.append(reasons);
    const questions = document.createElement("p");
    questions.innerHTML = "Questions: " + Questions;
    forSection.append(questions);

    


}

document.getElementById("form-song").onsubmit = submitContactForm;