<script lang="ts">
  export let href: string;
  export let thumb: string;
  export let title: string;
  export let date: string;

  let key = href.split('/').pop();

</script>

<a href={href}>
  <article style:view-transition-name={`post-${key}`} >
    <img src={thumb} alt=""style:view-transition-name={`post-img-${key}`} />
    <h3 style:view-transition-name={`post-title-${key}`}>{title}</h3>
    <p>{date}</p>
  </article>
</a>
<style>
* {
  color: #000;
  text-decoration: none;
}
a article {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
      overflow: hidden;
}
h3 {
  margin: 5px 5px 5px 40px;
  justify-self: start;
  flex-grow: 1;
}
img {
  width: 200px;
  max-height: 100px;
  max-width: 50%;
  
  border-radius: 16px;
  padding: 8px;
  box-sizing: border-box;
  align-self: center;
}
a article p {
    align-self: end;
}
@media (max-width: 540px) {
  img {
    display: none;
  }
}
</style>