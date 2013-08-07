/**
 *
 * Tipitip.js v1.0
 *
 * @sercaneraslan
 * @muratcorlu
 * 
 * @irfandurmus (http://irfandurmus.com) JSDoc'un ayrıştırabilmesi ve IDE'lerin tanıyabilmesi içi düzenleme yaptı
 *
 * @sahibinden.com 2013
 *
 */
$(function() {

    var body = $("body"),
        selectors = $(".tipitip-trigger"),
        selectorsLen = selectors.length,
        i = 0,
        ttIndex = 0,
        elSelector,
        elSelectorTitle,
        elEventOnload,

        /**
         *
         * Tooltip (ipucu kutusu) pozisyonunun hesaplandigi alandir.
         * elDataPos degiskenine tooltipin yon bilgisi gelir.
         * posIndex objesinin elDataPos (yon bilgisine) degerine karsilik
         * gelen 0. eleman top in, 1. eleman ise left in indeksi olur.
         * Elde edilen top ya da left indeksini posTop ya da posLeft array ine
         * göndererek ilgili pozisyonun hesaplanması saglanir.
         *
         * @return {Object} top ve left elemanı olan bir obje döner.
         *
         */

        positionCalculator = function( el, elDataPos, tipitip ) {

            var elWidth = el.innerWidth(),
                elHeight = el.innerHeight(),
                elPos = el.offset(),
                elPosTop = elPos.top,
                elPosLeft = elPos.left,
                tipitipOuterHeight = tipitip.outerHeight(),
                tipitipOuterWidth = tipitip.outerWidth(),
                tipitipArrowHeight = 15,
                tipitipArrowWidth = 20,
                posIndex = {
                    "north-east"    : [0, 0],
                    "north"         : [0, 1],
                    "north-west"    : [0, 2],
                    "south-east"    : [1, 0],
                    "south"         : [1, 1],
                    "south-west"    : [1, 2],
                    "west"          : [2, 3],
                    "east"          : [2, 4]
                },
                posTop = [
                    elPosTop - ( tipitipOuterHeight + tipitipArrowHeight ),    // south-west, south ve south-east top degerini hesaplar.
                    elPosTop + elHeight + tipitipArrowHeight,    // north-west, north ve north-east top degerini hesaplar.
                    elPosTop - ( ( tipitipOuterHeight - elHeight ) / 2 )    // west ve east top degerini hesaplar.
                ],
                posLeft = [
                    elPosLeft,    // north-west ve south-west left degerini hesaplar.
                    elPosLeft - ( ( tipitipOuterWidth - elWidth ) / 2 ),   // north ve south left degerini hesaplar.
                    elPosLeft - tipitipOuterWidth + elWidth,    // north-east ve south-east left degerini hesaplar.
                    elPosLeft - tipitipOuterWidth - tipitipArrowWidth,    // east left degerini hesaplar.
                    elPosLeft + elWidth + tipitipArrowWidth    // west left degerini hesaplar.
                ];

            return {
                "top"   : posTop[ posIndex[ elDataPos ][0] ],    // Yon degerinin 0. elemani elPosTop a gonderilir, yon hesaplanir.
                "left"  : posLeft[ posIndex[ elDataPos ][1] ]    // Yon degerinin 1. elemani elPosTop a gonderilir, yon hesaplanir.
            }
        },

        /**
         * @return undefined
         *
         */
        openEvent = function() {

            var el = $(this),
                elTitle = el.attr("title"),
                elDataPos = el.data("position") || "east",
                ttId = el.data("ttId"),
                ttIdDom = $( "#" + ttId ),
                ttIdLength = ttIdDom.length;

            if ( !(ttIdLength > 0) ) {    // Tooltip olusturulmamissa

                var customClass = el.data("class") ?  el.data("class") : '',
                    tipitip = $('<div id="' + ttId + '" class="tipitip ' + customClass + '"></div>').appendTo( body ),
                    elDataTarget = el.data("target"),
                    elContent = ( elDataTarget ? $( elDataTarget ).html() : "" ) || el.data("content") || el.attr("title");
                    // elContent, tooltip iceriginin nereden alinacagina karar verir ve oradan icerigi alip degiskene kaydeder.

                tipitip.addClass( "tt-" + elDataPos )
                       .html( elContent )
                       .css( positionCalculator( el, elDataPos, tipitip ) );

            } else {
                ttIdDom.show();
            }

            ttIdDom.css( positionCalculator( el, elDataPos, ttIdDom ) ).show();

            /**
             *
             * title ozniteliginin kendi kendine cikan varsayilan tooltipini engelemek icindir.
             * mouse eleman üzerine geldiginde title da ki bilgiyi elSelectorTitle degiskenine gonderir
             * ve title in icini temizler.
             *
             */

            if ( elTitle ) {
                elSelectorTitle = elTitle;
                el.attr("title", "");
            }

        },
        
        /**
         *
         * mouse eleman üzerinden gittiginde elSelectorTitle
         * degiskeninden icerik alinir ve title a eklenir.
         *
         * Eger elemanin stayOpen ozelligi yoksa
         * tooltip gizlenir.
         *
         * @return undefined
         */

        closeEvent = function() {

            var el = $(this),
                elTitle = el.attr("title");


            if ( elTitle === "" ) {
                el.attr("title", elSelectorTitle);
            }

            if ( !el.data("stayOpen") ) {
                $("#" + el.data("ttId") ).hide();
            }

        };

    /**
     *
     * .tipitip-trigger classi olan tum elemanlara eşsiz bir id ekler.
     * data-onload u true olanlar icin openEvent direk fonksiyonunu cagrilir.
     * Her bir elemanin openEvent leri ve closeEvent leri alinir
     * ilgili elemana atanir.
     *
     */

    for ( i; i < selectorsLen; i++ ) {

        elSelector = $(selectors[i]);
        elEventOnload = elSelector.data("onload");
        elOpenEvent = elSelector.data("openEvent") || "mouseenter";
        elCloseEvent = elSelector.data("closeEvent") || "mouseleave";
        elSelector.data("ttId", "tt-" + ttIndex++);

        if ( elEventOnload ) {
            openEvent.call( elSelector );
        }

        elSelector.bind( elOpenEvent, openEvent ).bind( elCloseEvent, closeEvent );

    }

    $(".tipitip").on("mouseleave", function() {
        $(this).hide();
    });

});
