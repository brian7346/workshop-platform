// Простой клиентский скрипт для воркшопа
document.addEventListener('DOMContentLoaded', function() {
  const app = document.getElementById('app');
  
  // Получаем список уроков
  fetch('/api/lessons')
    .then(response => response.json())
    .then(lessons => {
      if (lessons.length === 0) {
        app.innerHTML = `
          <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
            <h1>Воркшоп готов к работе</h1>
            <p>В этом воркшопе пока нет уроков или они не могут быть загружены.</p>
            <p>Проверьте директорию exercises в вашем проекте.</p>
          </div>
        `;
        return;
      }
      
      // Отрисовываем список уроков
      const sidebar = document.createElement('div');
      sidebar.style.width = '250px';
      sidebar.style.borderRight = '1px solid #eee';
      sidebar.style.padding = '20px';
      
      const content = document.createElement('div');
      content.style.flex = '1';
      content.style.padding = '20px';
      
      const title = document.createElement('h2');
      title.textContent = window.workshopConfig.title || 'Воркшоп';
      sidebar.appendChild(title);
      
      const nav = document.createElement('ul');
      nav.style.listStyle = 'none';
      nav.style.padding = '0';
      
      lessons.forEach(lesson => {
        const item = document.createElement('li');
        item.style.margin = '10px 0';
        
        const link = document.createElement('a');
        link.textContent = lesson.title;
        link.href = '#' + lesson.id;
        link.style.textDecoration = 'none';
        link.style.color = '#0066cc';
        
        link.addEventListener('click', function(e) {
          e.preventDefault();
          loadLesson(lesson.id);
        });
        
        item.appendChild(link);
        nav.appendChild(item);
      });
      
      sidebar.appendChild(nav);
      
      app.innerHTML = '';
      app.appendChild(sidebar);
      app.appendChild(content);
      
      // Загружаем первый урок по умолчанию
      loadLesson(lessons[0].id);
    })
    .catch(error => {
      console.error('Error loading lessons:', error);
      app.innerHTML = `
        <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
          <h1>Ошибка загрузки</h1>
          <p>Не удалось загрузить уроки. Пожалуйста, проверьте консоль браузера для деталей.</p>
        </div>
      `;
    });
    
  function loadLesson(id) {
    fetch(`/api/lessons/${id}`)
      .then(response => response.json())
      .then(lesson => {
        const content = document.querySelector('#app > div:nth-child(2)');
        
        const problemsSection = lesson.problems.length > 0
          ? `
            <h2>Задания</h2>
            <ul>
              ${lesson.problems.map(problem => `<li>${problem.id}</li>`).join('')}
            </ul>
          `
          : '<p>В этом уроке нет заданий.</p>';
          
        const solutionsSection = lesson.solutions.length > 0
          ? `
            <h2>Решения</h2>
            <ul>
              ${lesson.solutions.map(solution => `<li>${solution.id}</li>`).join('')}
            </ul>
          `
          : '';
        
        content.innerHTML = `
          <h1>${lesson.title}</h1>
          <div class="markdown-content">
            ${lesson.description.replace(/\n/g, '<br>')}
          </div>
          ${problemsSection}
          ${solutionsSection}
        `;
      })
      .catch(error => {
        console.error(`Error loading lesson ${id}:`, error);
        const content = document.querySelector('#app > div:nth-child(2)');
        content.innerHTML = `
          <h1>Ошибка загрузки урока</h1>
          <p>Не удалось загрузить урок ${id}.</p>
        `;
      });
  }
}); 