const hero = document.querySelector('#hero');

export default async (json) => {
  const data= await json;
  console.log(data);
  hero.innerHTML= `
    <img src="${data.hero_banner.url}" alt="hero banner ${data.hero_banner_alt_text}" class="hero" />
  `
}