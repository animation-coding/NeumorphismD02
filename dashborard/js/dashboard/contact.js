$(document).ready(function() {


  $('#btn-add-contact').on('click', function(event) {
    $('#addContactModal #btn-add').show();
    $('#addContactModal #btn-edit').hide();
    $('#addContactModal').modal('show');
  })

function deleteContact() {
  $(".delete").on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    $(this).parents('.items').remove();
  });
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});



function addContact() {
  $("#btn-add").on('click',function() {
	
    var getParent = $(this).parents('.modal-content');

    var $_name = getParent.find('#c-name');
    var $_occupation = getParent.find('#c-occupation');

    var $_getValidationField = document.getElementsByClassName('validation-text');
    var reg = /^.+@[^\.].*\.[a-z]{2,}$/;

    var $_nameValue = $_name.val();
    var $_occupationValue = $_occupation.val();

    if ($_nameValue == "") {
      $_getValidationField[0].innerHTML = 'Name must be filled out';
      $_getValidationField[0].style.display = 'block';
    } else {
      $_getValidationField[0].style.display = 'none';
    }

 
	var bg = $('#imagePreview').css('background-image');
	uploadedUserImage = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
	



    $html = '<div class="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6 items">' +
              '<div class="card contact-bx item-content">' +
					'<div class="card-header border-0">'+
						'<div class="action-dropdown">'+
							'<div class="dropdown">'+
								'<a href="javascript:void(0);" data-toggle="dropdown" aria-expanded="false">'+
									'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'+
										'<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+'</path>'+
										'<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+'</path>'+
										'<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+'</path>'+
									'</svg>'+
								'</a>'+
								'<div class="dropdown-menu dropdown-menu-right">'+
									'<a class="dropdown-item edit" href="javascript:void(0);">'+'Edit'+'</a>'+
									'<a class="dropdown-item delete" href="javascript:void(0);">'+'Delete'+'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
                  '<div class="card-body user-profile">' +
					'<div class="image-bx">'+
						'<img src="'+uploadedUserImage+'" data-src="'+uploadedUserImage+'" class="rounded-circle" >' +
						'<span class="active">'+'</span>'+
                      '</div>' +
                      '<div class="media-body user-meta-info">' +
						  '<h6 class="fs-20 font-w500 my-1">'+
							'<a href="app-profile.html" class="text-black user-name" data-name='+ $_nameValue +'>'+ $_nameValue +'</a>'+
							'</h6>'+
                          '<p class="user-work" data-occupation='+ $_occupationValue +'>'+ $_occupationValue +'</p>' +
						  '<ul>'+
								'<li>'+'<a href="javascript:void(0);">'+'<i class="fa fa-phone" aria-hidden="true">'+'</i>'+'</a>'+'</li>'+
								'<li>'+'<a href="messages.html">'+'<i class="las la-sms">'+'</i>'+'</a>'+'</li>'+
								'<li>'+'<a href="javascript:void(0);">'+'<i class="fa fa-video-camera" aria-hidden="true">'+'</i>'+'</a>'+'</li>'+
							'</ul>'+
                      '</div>' +
                  '</div>' +
              '</div>' +
          '</div>';


		

      $(".searchable-items > .items-header-section").after($html);
      $('#addContactModal').modal('hide');

      var $_setNameValueEmpty = $_name.val('');
      var $_setOccupationValueEmpty = $_occupation.val('');

    deleteContact();
    editContact();
    //checkall('contact-check-all', 'contact-chkbox');
  });  
}

$('#addContactModal').on('hidden.bs.modal', function (e) {
    var $_name = document.getElementById('c-name');
    var $_occupation = document.getElementById('c-occupation');
    var $_getValidationField = document.getElementsByClassName('validation-text');

    var $_setNameValueEmpty = $_name.value = '';
    var $_setOccupationValueEmpty = $_occupation.value = '';

    for (var i = 0; i < $_getValidationField.length; i++) {
      e.preventDefault();
      $_getValidationField[i].style.display = 'none';
    }
})

function editContact() {
  $('.edit').on('click', function(event) {

    $('#addContactModal #btn-add').hide();
    $('#addContactModal #btn-edit').show();

    // Get Parents
    var getParentItem = $(this).parents('.items');
    var getModal = $('#addContactModal');

    // Get List Item Fields
    var $_name = getParentItem.find('.user-name');
    var $_occupation = getParentItem.find('.user-work');
	
    var $_img = getParentItem.find('.rounded-circle');

    // Get Attributes
	var $_nameAttrValue = $_name.attr('data-name');
	var $_occupationAttrValue = $_occupation.attr('data-occupation');
	var $_imgAttrValue = $_img.attr('data-src');

// Get Modal Attributes
	var $_getModalNameInput = getModal.find('#c-name');
	var $_getModalOccupationInput = getModal.find('#c-occupation');

	// Set Modal Field's Value
	var $_setModalNameValue = $_getModalNameInput.val($_nameAttrValue);
	var $_setModalOccupationValue = $_getModalOccupationInput.val($_occupationAttrValue);
	$('#imagePreview').css('background-image',"url(" + $_imgAttrValue + ")");
	
	
	
	

    $('#addContactModal').modal('show');
	
	

    $("#btn-edit").off('click').on('click', function(){

      var getParent = $(this).parents('.modal-content');

      var $_getInputName = getParent.find('#c-name');
      var $_getInputNccupation = getParent.find('#c-occupation');
	  
	  var bg = $('#imagePreview').css('background-image');
	  uploadedUserImage = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
	  
      // var $_getPreview = getParent.find('#imagePreview');


      var $_nameValue = $_getInputName.val();
      var $_occupationValue = $_getInputNccupation.val();
	  

      var  setUpdatedNameValue = $_name.text($_nameValue);
      var  setUpdatedOccupationValue = $_occupation.text($_occupationValue);
	  
      var  setDataSrc =  $_img.attr('src', uploadedUserImage);
	  

      var  setUpdatedAttrNameValue = $_name.attr('data-name', $_nameValue);
      var  setUpdatedAttrOccupationValue = $_occupation.attr('data-occupation', $_occupationValue);
      var  setUpdatedAttrImgValue = $_img.attr('data-src', uploadedUserImage);
	  
      $('#addContactModal').modal('hide');
    });
  })
}


deleteContact();
addContact();
editContact();

})


// Validation Process

var $_getValidationField = document.getElementsByClassName('validation-text');
var reg = /^.+@[^\.].*\.[a-z]{2,}$/;

getNameInput = document.getElementById('c-name');

getNameInput.addEventListener('input', function() {

  getNameInputValue = this.value;

  if (getNameInputValue == "") {
    $_getValidationField[0].innerHTML = 'Name Required';
    $_getValidationField[0].style.display = 'block';
  } else {
    $_getValidationField[0].style.display = 'none';
  }

})



getPhoneInput = document.getElementById('c-phone');


