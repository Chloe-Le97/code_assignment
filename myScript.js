//hamburger bar 
// add class then using css to change the status of hamburger bar
function onClickMenu() {
    document.getElementById("hamburger").classList.toggle("change");
    document.getElementById("nav").classList.toggle("changenav");
    document.getElementById("hamburger-bg").classList.toggle("change-bg");
    document.querySelector("body").classList.toggle("change-bod");
}

function CloseMenu() {
    document.getElementById("hamburger").classList.remove("change");
    document.getElementById("nav").classList.remove("changenav");
    document.getElementById("hamburger-bg").classList.remove("change-bg");
    document.querySelector("body").classList.remove("change-bod");
}


// animated number 
window.addEventListener('scroll',(event)=>{
    event.preventDefault();
    if (window.scrollY>=400){
        const counters = document.querySelectorAll(".number_text_number")
        const speed = 400;

        counters.forEach(counter=>{
            const updateNumber = () =>{
                const target = Number(counter.getAttribute('data-target'))
                const count = Number(counter.innerHTML);

                const inc = target/speed;
                // const inc = 1;

                if(count < target){
                    counter.innerHTML = Math.ceil(count + inc)
                    setTimeout(updateNumber,120)
                }else{
                    count.innerHTML = target
                }
            }

            updateNumber()
        })
    }else{
        const counters = document.querySelectorAll(".number_text_number")
        counters.forEach(counter =>{
            counter.innerHTML = 0;
        })
    }

});


// update the latest news according to the RSS 
// use proxy to solve CORS problem
// change the title of the latest news as well as update the link to the news
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.lianatech.com/resources/blog.rss')}`)
.then(response => {
	if (response.ok) return response.json()
	throw new Error('Network response was not ok.')
})
.then(data => data.contents)
.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
.then(result=>{
    const items = result.querySelectorAll("item");
    
    console.log(items)

    const news_details= document.querySelectorAll(".news_details_title");
    const date_publish = document.querySelectorAll(".news_date");
    const news_link = document.querySelectorAll(".news_link");
    for (let i = 0; i < 4; i++) {
        let item = items[i];
        let news_detail = news_details[i];
        let date = date_publish[i];
        let link = item.querySelector("link").innerHTML;

        news_link[i].setAttribute('href',link);
        const parseDate = item.querySelector("pubDate").innerHTML.split(' ');
        news_detail.innerHTML = item.querySelector("title").innerHTML;
        date.innerHTML = `${parseDate[1]} ${parseDate[2]} ${parseDate[3]}`;
      }
});

const submitForm = () =>{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailInput = document.querySelector(".email_input");
    if(emailInput.value==''){alert('Please fill your email to subscribe to our latest news')}
    else if(!emailInput.value.match(mailformat)){alert('Please provide a valid email address')}
    else{
        const subcribe_noti = document.querySelector(".subcribe_noti");
        subcribe_noti.style.display="block";
        setTimeout(()=>{subcribe_noti.style.display="none"},3000);
    }

    emailInput.value='';
}
