// get project data and display projects
$(() => {
    const url = '/data/projects';
    $.ajax({
      type: "GET",
      url: url,
      success: (data) =>
      {
        let projects = [];
        data.projects.forEach((ele, index) => {
            const project = [
            `<div class="grid-item grid-item-${index + 1}">
              <div class="card">
              
                <!-- Card image -->
                <div class="view overlay">
                   <img class="card-img-top" src="${ele.img_link}" alt="${ele.name}"/>
                  <a href=${ele.project_link} target="_blank">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>
              
                <!-- Card content -->
                <div class="card-body">
              
                  <!-- Title -->
                  <h4 class="card-title">${ele.name}</h4>
                  <!-- Text -->
                  <p class="card-text">${ele.category}</p>
                  <p class="card-text">${ele.description}</p>
                  <!-- Buttons -->
                  <a href=${ele.project_link} target="_blank" class="btn btn-light card-btn card-btn-1">Project</a>
                  <a href=${ele.code_link} target="_blank" class="btn btn-light card-btn card-btn-2">Code</a>
                  
                  
                </div>
              
              </div>

            </div>`
              ];
              projects.push(project.join(''));
        });
        $('#projects').html(projects.join(''));
      }
    })
});

// contact form submit message
$("#contact-form").submit(() => {
    alert( "Thanks for your message. I will be in touch soon." );
  });