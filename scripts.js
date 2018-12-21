

(function(){

    Contacts = {

        init : function(conf){
            this.config = conf;
            this.bindEvents();
            $.ajaxSetup({
                url : this.config.baseUrl + '/users'
            })
        },

        bindEvents : function(){
            $(document).on('ready', this.getContacts);
            this.config.cardButton.on('click', '.card button', this.getContactInfo);
            this.config.info.on('click', '.desc button', this.close);

            // this.config.info.on('click', 'button' , this.close);
            this.config.count.on('click', this.change);
        },

        change      : function(){
            var self = Contacts;
          var txt =  $(this).text();
          console.log("Page Numbaer: " + txt);

          txt = (txt-1)*10;
        
          $.ajax({
            success : function(response){
                if (response.length){
                    let cards = '';
                    for (let i=txt; i<txt+10; i++){
                        cards += `<div class="card" id="card-${response[i].id}">
                            <img src="${response[i].avatar}" alt="">
                            <div class="contact-details">
                                <h3 class="title">${response[i].name} ${response[i].family}</h3>
                                <br>
                                <button>Read More</button>
                            </div>
                        </div>`;
                    }
                    // console.log(cards);
                
                    
                    
                    self.config.container.empty();        
                    self.config.container.html(cards);
                }
            },
        })
            
        },

        getContacts : function(){
            var self = Contacts;
            $.ajax({
                // Endpoint
        
                beforeSend : function(){
                    console.log('before send')
                    $('.loader').show();
                },
                
                success : function(response){
                    if (response.length){
                        let cards = '';
                        // response.forEach(function(item){
                        //     cards += `<div class="card" id="card-${item.id}">
                        //                 <img src="${item.avatar}" alt="">
                        //                 <div class="contact-details">
                        //                     <h3 class="title">${item.name} ${item.family}</h3>
                        //                     <br>
                        //                     <button>Read More</button>
                        //                 </div>
                        //             </div>`;
                        // });
                        for (let i=0; i< 10; i++){
                            cards += `<div class="card" id="card-${response[i].id}">
                                <img src="${response[i].avatar}" alt="">
                                <div class="contact-details">
                                    <h3 class="title">${response[i].name} ${response[i].family}</h3>
                                    <br>
                                    <button>Read More</button>
                                </div>
                            </div>`;
                        }
                        // console.log(cards);
                        self.config.container.html(cards);
                    }
                },
        
                error : function(error){
                    console.log(error);
                },
        
                complete : function(){
                    $('.loader').hide();
                    console.log('complete')
                }
            })
        },

        getContactInfo : function(){
            var self = Contacts;

            // console.log(this);
            var desc = '';
            let id = $(this).parents('.card').attr('id').split('-')[1];

            console.log("id:" + id);

            $.ajax({
                url : self.config.baseUrl + '/users/' + id,

                success : function(data){
                    // console.log(data.shortStory)
                    desc = `<div class="desc">
                    <button class="close">Close</button>
                    <p>${data.shortStory}</p>
                </div>`;

                self.config.info.css('display','block');
                self.config.info.html(desc);
                
                },

                error : function(){

                },

                complete : function(){

                }
            })
        },

        close : function(){
           $(this).parents('.info').css('display','none');
           
            
            
            
        }

    }

    Contacts.init({
        loader      :   $('.loader'),
        baseUrl     :   'http://localhost:3000',
        container   :   $('.container'),
        cardButton  :   $('.container'),
        info        :   $('.info'),
        count       : $('.countNumber')
    })

})();


//   $( document ).ready(function() {
//     $( ".close" ).click(function() {
//         alert( "Handler for .click() called." );
//       });
//       console.log(20)
// });