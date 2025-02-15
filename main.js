let isSubscribed = false;

// Sample article content
const articles = {
  1: {link: "./les1.html"},
  2: {link: "./les2.html"},
  3: {link: "./les3.html"},
  4: {link: "./les4.html"},
  5: {link: "./les5.html"},
};

const quizes = {
  1: { link: "./quiz1.html" },
  2: { link: "./quiz2.html" },
  3: { link: "./quiz3.html" },
  4: { link: "./quiz4.html" },
  5: { link: "./quiz5.html" },
}

function openArticle(articleId) {
  if (articleId <= 5 || isSubscribed) {
    const art = articles[articleId];
    window.open(art.link, "_blank");
  } else {
    alert("Пожалуйста, оплатите подписку для открытия этого урока");
  }
}

function openQuiz(id){
  if (id <= 5 || isSubscribed) {
    const quiz = quizes[id];
    window.open(quiz.link, "_blank");
  } else {
    alert("Пожалуйста, оплатите подписку для открытия этого урока");
  }
}

function closeModal() {
  document.getElementById("articleModal").style.display = "none";
}


function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    // Basic validation
    if (!data.name || !data.email || !data.cardNumber || !data.expiryDate || !data.cvv || !data.plan) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Simulate payment processing
    alert(`Thank you, ${data.name}! Your subscription (${data.plan}) has been activated.`);
    isSubscribed = true;
    document.getElementById("paymentForm").reset(); // Clear the form
  }