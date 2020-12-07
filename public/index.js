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
        showPage(1)
        
        //$('.pagination').html(paginationButtons.join(''))
      }
    })
})
  pageSize = 5

  showPage = function(page) {
    $(".grid-item").hide();
    $(".grid-item").each(function(n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });        
  }

  // need to keep track of which page the user is currently on for next and prev to work (state)

  let currentPage = 1;
  showPage(currentPage)
  
  $(".pagination li a").click(function(e) {
    $(".pagination li a").removeClass("current").parent().removeClass('active');
    if (e.target.id === 'paginate-previous') {
      console.log($(`#paginate-btn-${currentPage}`))
      if (currentPage >= 2) { // lower limit
      currentPage = currentPage-1;
      }
      console.log(currentPage)
      $(`#paginate-btn-${currentPage}`).addClass("current").parent().addClass('active');
      showPage(currentPage) 

    } else if (e.target.id === 'paginate-next') {
      console.log($(`#paginate-btn-${currentPage}`))
      if (currentPage <= 4 ) { // upper limit
      currentPage++;
      }
      console.log(currentPage)
      $(`#paginate-btn-${currentPage}`).addClass("current").parent().addClass('active');
      showPage(currentPage) 
    }  
    else {
    $(this).addClass("current").parent().addClass('active');
    showPage(parseInt($(this).text())) 
    currentPage = this.innerText;
    console.log(currentPage)
    }
  });

// contact form submit message
$("#contact-form").submit(() => {
    alert( "Thanks for your message. I will be in touch soon." );
  });


$(document).ready(function(){
    $("#paginate-btn-1").trigger('click'); 
});


