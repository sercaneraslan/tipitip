#Tipitip.js

Tipitip, JavaScript ve CSS ile çalışan bir Tooltip (ipucu) kütüphanesidir. Tooltip'te hiçbir imaj kullanılmamıştır, saf CSS ile yazılmıştır. Diğer kütüphanelerin aksine ilgili sayfaya JavaScript ya da CSS kodu ekleyerek çalıştırılmaz, Tooltip göstermek istenilen elemena şu 3 özelliği ekleyerek JavaScript ya da CSS yazmadan Tooltip'i çalıştırabilirsiniz. ( tipitip.min.js ve tipitip.css dosyalarını sayfanıza eklemeyi unutmayınız.)

Not: Tooltip eklemek istediğiniz elemanın ne olduğu önemli değildir. (Örneğin; a, span, div, p vb etiketleri kullanabilirsiniz.)

Tooltip eklemek istediğiniz elemana tipitip-trigger class'ı eklenmeli. (Tipitip.js bu class'a sahip olan eleman üzerinde çalışır.)

Tooltip'in hangi yönden çıkacağı elemana data-position özniteliği eklenerek belirlenir. Varsayılan olarak "east" tir. Örneğin;

* data-position="north-west"
* data-position="north"
* data-position="north-east"
* data-position="east"
* data-position="west"
* data-position="south-west"
* data-position="south"
* data-position="south-east"


Ve son olarak Tooltip'in içeriğinin nereden alınacağı yazılır. ( title ya da data-content özniteliklerine içeriği yazabilirsiniz ya da data-target özniteliğine bir id ya da class ismi vererek o class 'a ya da id 'ye sahip elemanın içeriğini otomatik olarak almasını sağlayabilirsiniz. Örnek: data-target=".class-name" -  data-target="#id-name" )


Not: data-target özniteliğini kullanırsanız id ya class verdiğiniz elemena "tipitip-target" class'ı ekleyerek o elemanın display: none; olmasını sağlayabilirsiniz.

* data-onload özniteliğine true değeri verilerek Tooltip'in sayfa yüklendiğinde açık olarak gelmesi sağlanabilir. Örnek kullanım: data-onload="true"

* data-class özniteliğine istediğiniz bir class'ı vererek Tooltip'de değişiklikler yapabilirsiniz. Örnek kullanım: data-class="custom-class"

* data-stay-open özniteliğine true değeri verilerek elemanın hover'ında Tooltip'in açık kalması sağlanabilir. Örnek kullanım: data-stay-open="true"

* data-open-event özniteliğine herhangi bir event yazılarak elemanın hangi event'te açılacağını belirtebilirsiniz. Örnek kullanım: data-open-event="focus"

* data-close-event özniteliğine herhangi bir event yazılarak elemanın hangi event'te kapatılacağını belirtebilirsiniz. Örnek kullanım: data-close-event="blur"