const sections = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add('show');
    }
  });
});


$(document).ready(function () {
console.log("script.js loaded successfully");

  // Questions
  let questions = [
    { q: "What do you enjoy the most?", name: "q1", options: { tech: "Solving logical problems", teach: "Teaching others", creative: "Designing / Art", manage: "Working with people" }},
    { q: "How do you prefer to work?", name: "q2", options: { solo: "Independently", team: "In a team" }},
    { q: "What kind of learning do you like?", name: "q3", options: { tech: "Coding", data: "Data & Analysis", creative: "Creative skills" }},
    { q: "Your behavior in a group?", name: "q4", options: { lead: "I lead", support: "I support", analyse: "I observe & analyze" }},
    { q: "What motivates you?", name: "q5", options: { innovate: "Building new things", help: "Helping others", growth: "Career growth" }},
    { q: "Which skill is your strongest?", name: "q6", options: { logic: "Logical thinking", design: "Creativity", talk: "Communication" }},
    { q: "Preferred work environment?", name: "q7", options: { office: "Office", remote: "Remote", flexible: "Flexible" }}
  ];

  if ($("#questionContainer").length) {
    questions.forEach((q, i) => {
      $("#questionContainer").append(`<p><b>${i+1}. ${q.q}</b></p>`);
      for (let key in q.options) {
        $("#questionContainer").append(`<label><input type="radio" name="${q.name}" value="${key}"> ${q.options[key]}</label><br>`);
      }
      $("#questionContainer").append("<hr>");
    });
  }

  $("input[type=radio]").change(() => {
    let answered = $("input:checked").length;
    let percent = Math.floor(answered / questions.length * 100);
    $("#progressBar").css("width", percent+"%").text(percent+"%");
  });


  // FIND CAREER
  $("#findCareer").click(function () {

    let name = $("#userName").val().trim();
    if (!name) {
      alert("Please enter your name!");
      return;
    }

    if ($("input:checked").length < questions.length) {
      alert("Answer all questions!");
      return;
    }

    let score = { tech:0,data:0,creative:0,teach:0,manage:0 };
    $("input:checked").each(function(){ score[$(this).val()]++; });

    let career="", emoji="", desc="", conf="", section="";

    if (score.tech >= 2) { career="Software Developer"; emoji="💻✨"; desc="You love building software"; conf="90%"; section="software"; }
    else if (score.data >= 2) { career="Data Analyst"; emoji="📊🔥"; desc="You turn data into insights"; conf="87%"; section="data"; }
    else if (score.creative >= 2) { career="UI/UX Designer"; emoji="🎨💫"; desc="You design amazing visuals"; conf="85%"; section="design"; }
    else if (score.manage >= 2) { career="HR / Manager"; emoji="👥💼"; desc="You manage people well"; conf="80%"; section="hr"; }
    else { career="Business / Marketing"; emoji="📈🔥"; desc="Growth & strategy focus"; conf="78%"; section="business"; }

    $("#careerResult").html(`${name}, your best career is: ${career} ${emoji}`);
    $("#confidenceText").html(`Confidence: ${conf}`);
    $("#careerDesc").html(desc);

    $("#switchPlan").html(`Switching Plan: Improve required skills & follow roadmap to become a ${career}!`);

    $("#resultCard").removeClass("d-none");

    // Save data
    let results = JSON.parse(localStorage.getItem("results") || "[]");
    results.push({ name, career, conf, date:new Date().toLocaleString() });
    localStorage.setItem("results", JSON.stringify(results));

    $("#goRoadmap").click(function(){
      window.location.href = "roadmap.html#" + section;
    });

  });

  // Admin table loading
  if ($("#resultTable").length) {
    let data = JSON.parse(localStorage.getItem("results")||"[]");
    data.forEach((item,i)=>{
      $("#resultTable").append(`
        <tr>
          <td>${i+1}</td>
          <td>${item.name}</td>
          <td>${item.career}</td>
          <td>${item.conf}</td>
          <td>${item.date}</td>
        </tr>
      `);
    });

    $("#clearAll").click(()=>{
      if(confirm("Clear all history?")) {
        localStorage.removeItem("results");
        location.reload();
      }
    });
  }

});