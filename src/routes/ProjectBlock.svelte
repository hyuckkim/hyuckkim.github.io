<script lang="ts">
  export let href: string;
  export let thumb: string;
  export let title: string;
  export let date: string;

  let articleObject: HTMLElement,
   imgObject: HTMLElement, titleObject: HTMLElement;

  let key = href.split('/').pop();

</script>

<a href={href}>
  <article bind:this={articleObject} style:view-transition-name={`post-${key}`} >
    <img src={thumb} alt="" bind:this={imgObject} style:view-transition-name={`post-img-${key}`} />
    <h3 bind:this={titleObject} style:view-transition-name={`post-title-${key}`}>{title}</h3>
    <p>{date}</p>
  </article>
</a>
<style>
  
* {
  color: #000;
  text-decoration: none;
}
h3 {
  margin: 5px;
}
img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 16px;
  padding: 8px;
  box-sizing: border-box;
  align-self: center;
}
</style>