// Salvar agenda para localStorage
function saveAgenda() {
  const agendaData = {};
  days.forEach(day => {
    const dayContent = document.querySelector(`.day[data-day="${day}"] .day-content`);
    agendaData[day] = Array.from(dayContent.children)
      .map(c => c.textContent.replace("×", "").trim());
  });
  localStorage.setItem('agendaData', JSON.stringify(agendaData));
  alert('Agenda salva com sucesso!');
}

// Carregar agenda do localStorage
function loadAgenda() {
  const agendaData = JSON.parse(localStorage.getItem('agendaData') || '{}');
  days.forEach(day => {
    const dayContent = document.querySelector(`.day[data-day="${day}"] .day-content`);
    dayContent.innerHTML = '';
    if (agendaData[day]) {
      agendaData[day].forEach(topic => {
        let category = '';
        for (const ctp of allTopics) {
          if (ctp.text === topic) {
            category = ctp.category;
            break;
          }
        }
        if (!category) category = "matematica";

        const newTopic = document.createElement("div");
        newTopic.className = `topic-item ${category}`;
        newTopic.textContent = topic;

        const removeBtn = document.createElement("span");
        removeBtn.textContent = "×";
        removeBtn.title = "Remover";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => {
          newTopic.remove();
        };

        newTopic.appendChild(removeBtn);
        dayContent.appendChild(newTopic);
      });
    }
  });
}

document.getElementById('saveBtn').addEventListener('click', saveAgenda);
document.getElementById('loadBtn').addEventListener('click', loadAgenda);
