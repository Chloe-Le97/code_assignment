function onClickMenu() {
    document.getElementById("hamburger").classList.toggle("change");
    document.getElementById("nav").classList.toggle("changenav");
    document.getElementById("hamburger-bg").classList.toggle("change-bg");
    document.getElementById("main").classList.toggle("change-body");
    document.querySelector("body").classList.toggle("change-bod");
}

function CloseMenu() {
    document.getElementById("hamburger").classList.remove("change");
    document.getElementById("nav").classList.remove("changenav");
    document.getElementById("hamburger-bg").classList.remove("change-bg");
    document.getElementById("main").classList.remove("change-body");
    document.querySelector("body").classList.remove("change-bod");
}

window.addEventListener('scroll',function(event){
    event.preventDefault();
    if (window.scrollY>=400){
        const counters = document.querySelectorAll(".number_text_number")
        const speed = 400;

        counters.forEach(counter=>{
            const updateNumber = () =>{
                const target = Number(counter.getAttribute('data-target'))
                const count = Number(counter.innerHTML);

                const inc = target/speed;

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

const RSS_URL = `https://cors-anywhere.herokuapp.com/https://www.lianatech.com/resources/blog.rss`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data)
    const items = data.querySelectorAll("item");
    const news_details= document.querySelectorAll(".news_details_title");
    const date_publish = document.querySelectorAll(".news_date");
    console.log(news_details)
    for (let i = 0; i < 4; i++) {
        let item = items[i];
        let news_detail = news_details[i];
        let date = date_publish[i];
        news_detail.innerHTML = item.querySelector('title').innerHTML;
        date.innerHTML = item.querySelectorAll('pubDate').innerHTML;
      }

    }

  )