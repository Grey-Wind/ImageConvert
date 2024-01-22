<script setup>
import IntroduceItem from './IntroduceItem.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import ImageConverterIcon from './icons/IconImageConverter.vue'
import DocumentConverterIcon from './icons/IconDocumentConverter.vue'
</script>

<template>
  <IntroduceItem>
    <template #icon>
      <ImageConverterIcon />
    </template>
    <template #heading>图像转换器</template>
    图像转换器可以快速将不同类型的图片转换成您所需要的格式。
  </IntroduceItem>

  <IntroduceItem>
    <template #icon>
      <DocumentConverterIcon />
    </template>
    <template #heading>文档转换器</template>
    <p>文档转换器可以快速将不同类型的文档转换成您所需要的格式。</p>
    <p>例如将Word文档或Excel表格转换为PDF。</p>
  </IntroduceItem>

  <IntroduceItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </IntroduceItem>

  <IntroduceItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </IntroduceItem>

  <IntroduceItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </IntroduceItem>
</template>
