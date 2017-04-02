/* 
    Document   : script.js
     Created on : 12 déc. 2013, 14:03:07
    Author     : Hayat ,Zakaria
    Description:
         script javascript.
    Last Modification : 21 fev. 2014
*/




jQuery(document).ready(function () {
    jQuery('input, textarea').placeholder();

    jQuery('#slideNews ul').carouFredSel({
        scroll: 1,
        items: {
            visible: 2
        },
        auto: {
            items: 2,
            duration: 30500,
            easing: "linear",
            timeoutDuration: 0,
            pauseOnHover: "immediate"
        }
    });
    jQuery('#graphes ul.tabs').carouFredSel({
        width: 370,
        circular: false,
        infinite: false,
        scroll: 1,
        easing: "linear",
        timeoutDuration: 0,
        auto: false,
        prev: {
            button: ".prev",
            key: "left"
        },
        next: {
            button: ".next",
            key: "right"
        }
    });

    jQuery(".deroulant").nestedmenu();
    jQuery("#graphes").tabs();
    jQuery("#news").tabs();
    jQuery("#datepicker").datepicker();



});


function transformCMMResult() {
    window.setTimeout(timeRunFun, 500)
}
function timeRunFun() {
    var _HTML = '';
    var _start_HTML = '<div id="news" class="tabsContenur"><h3 class="title">News</h3><a style="float: left; height: 14px; margin-left: 220px; border: 0px none;" href="mailto:admins_cobi@ocpgroup.ma?subject=Submit an article to an administrator" class="lnkSubmit lnkSubmitArticles" title="Submit an article to an administrator"></a>';
    var _end_HTML = '</div>'
    var _UL = '<ul class="tabs">';
    var _Tabs = '';
    var _oldKey=''
    jQuery('.list.listCol-2 .ResultCMM').each(function (indexResult, elementResult) {
        var title = jQuery(jQuery(elementResult).parents('.ms-webpart-chrome').find('.ms-webpart-chrome-title .ms-webpart-titleText span')[0]).html();
        var query = "";
        if (jQuery(jQuery(elementResult).find(".ThemeArticlos")).length > 0) {
            var ArticleQuery = jQuery(jQuery(elementResult).find(".ThemeArticlos")).val().split("#");
            for (var ss in ArticleQuery) {
                var gs = ArticleQuery[ss].split(":");
                if (gs.length > 1) {
                    var _key = gs[0];
                    var _value = gs[1].replace(/"/g, "");

                    if (_oldKey == _key) {
                        query += '{%22n%22%3A%22' + _key + '%22%2C%22t%22%3A[%22%5C%22' + _value + '%5C%22%22]%2C%22o%22%3A%22or%22%2C%22k%22%3Afalse%2C%22m%22%3Anull}%2C';
                    }
                    else {
                        _oldKey = _key;
                        query += '{%22n%22%3A%22' + _key + '%22%2C%22t%22%3A[%22%5C%22' + _value + '%5C%22%22]%2C%22o%22%3A%22and%22%2C%22k%22%3Afalse%2C%22m%22%3Anull}%2C';
                    }
                    //query += '{%22n%22%3A%22' + _key + '%22%2C%22t%22%3A[%22%5C%22' + _value + '%5C%22%22]%2C%22o%22%3A%22and%22%2C%22k%22%3Afalse%2C%22m%22%3Anull}%2C';
                }
                // query += '{"n":"' + _key + '","t":["\"' + _value + '\""],"o":"and","k":false,"m":null},';
            }
        }
        query = query.substring(0, query.length - 3)
        var siteURL = L_Menu_BaseUrl + '/Pages/Search/news.aspx#Default=%7B%22k%22%3A%22%22%2C%22r%22%3A[' + query + ']%7D';
        _UL += '<li><a href="#tabs-' + indexResult + '">' + title + '</a></li>';
        _Tabs += '<div id="tabs-' + indexResult + '"><div class="list listCol-2">';

        _Tabs += ' <br class="clear" />';
        

        if (jQuery(jQuery(elementResult).find('.ms-srch-group-content')).length != 0) {
            if (title == "Favorites") {
                
                _Tabs += ' <br class="clear" />';
                _Tabs += jQuery(jQuery(elementResult).find('.ms-srch-group-content')).html();
                _Tabs += '<br class="clear" />';
            }
            else {
                _Tabs += ' <a href="' + siteURL + '" class="suite">View all</a><br class="clear" />';
                _Tabs += jQuery(jQuery(elementResult).find('.ms-srch-group-content')).html();
                _Tabs += '<br class="clear" /><a href="' + siteURL + '" class="suite">View all</a>';
            }
           
        }
        else {
            _Tabs += ' <br class="clear" />';
            _Tabs += ' <br class="clear" />';
            _Tabs += "Nothing here matches your search";
        }
        
        _Tabs += '<br class="clear" /></div></div>';
    });
    _UL += '</ul>';
    _HTML = _start_HTML + _UL + _Tabs + _end_HTML;

    var WebPartZoneResult = jQuery('.list.listCol-2 .ResultCMM').parents('.ms-webpart-zone');
    jQuery(WebPartZoneResult).append(_HTML);
    jQuery('.list.listCol-2 .ResultCMM').parents('.s4-wpcell-plain').remove();

    jQuery('#news').tabs();

}


function AddWelcomeToUsername() {

    //<!--<ContentTypeRef ID="0x0120" />-->
    var userName = jQuery('[id$=_Menu_t]').children("a").html();
    var welcome = "<div class='ms-core-menu-root'>Welcome , <strong>";
    var ex = "</strong></div>";
    userName = welcome + userName + ex;
    jQuery('[id$=_Menu_t]').html(userName);
    var imageSetting = "<img src='" + L_Menu_BaseUrl + "/Style Library/OCP.CMM/images/settingTop.png' alt='Settings' class='picto'/>";
    jQuery('[class$=ms-siteactions-imgspan]').html(imageSetting);
    var Disconnect = "<a accesskey='6' title='Disconnect' onclick='STSNavigate2(event,\"/_layouts/15/SignOut.aspx\");return false' href='../../_controltemplates/15/#' class='disconnect' style='display: inline-block; padding: 8px;'><span style='height:16px;position:relative;display:inline-block;overflow:hidden;' class='s4-clust'><img src='" + L_Menu_BaseUrl + "/Style Library/OCP.CMM/images/exitTop.png' alt='Disconnect' class='picto'><span class='textPicto'>Disconnect</span></span></a>";

    var NewSetting = '<div class="headerTop">' +
                        '<div class="menuTop">' +
						'<ul>' +
							'<li class="paramLink">' +
                            '<a href="#" class="disconnect">' +
                            imageSetting +
                            '<span class="textPicto">Settings</span>' +
                            '</a>' +
                            '<ul>' +
                                '<li><a href="' + L_Menu_BaseUrl + '/Pages/FlowingTheme.aspx">Favorites</a></li>' +
                                '</ul>' +
                            '</li>' +
						'</ul>' +
					'</div>' +
                    '</div>';



    jQuery('[id$=ms-help]').html(NewSetting + Disconnect);
    jQuery(".menuTop").nestedmenu();
}


window.onload = function () { Sys.WebForms.PageRequestManager.getInstance().add_endRequest(transformCMMResult); };
_spBodyOnLoadFunctionNames.push("AddWelcomeToUsername");
_spBodyOnLoadFunctionNames.push("transformCMMResult");




