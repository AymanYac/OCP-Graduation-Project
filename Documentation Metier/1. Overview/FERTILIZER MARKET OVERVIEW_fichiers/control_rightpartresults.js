/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_0ecba0b0d110499a954799ee246f2f53(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_0ecba0b0d110499a954799ee246f2f53.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fControl_RightPartResults.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
,'<div class="bloc">						'
,'						<div class="list">'
,'    <div id="Control_SearchResults">'
);
        if (Srch.U.shouldAnimate(ctx.DataProvider)){            
            Srch.U.hideElement(ctx.ClientControl.get_element());
            ctx.OnPostRender = function(){ Srch.U.animateResults(ctx.ClientControl, ctx.DataProvider.get_userAction()); }; 
        }
ms_outHtml.push('                    '
,'        '
); 
            if(!$isNull(ctx.ScriptApplicationManager) && !$isNull(ctx.DataProvider) && !$isNull(ctx.ClientControl)){
                var appStates = ctx.ScriptApplicationManager.states;

                var getUpScopeHtml;
                if(ctx.ClientControl.get_showUpScopeMessage()){  
                    getUpScopeHtml = function(linkId) {
                        var upScopeUrl = ctx.DataProvider.get_upScopeUrl();
                        if (!$isEmptyString(upScopeUrl)) {
                            var upScopeTitle = String.format($resource("rs_UpscopeTitle"), $resource("rs_UpScopeActionPhrase"));
                            var upScopeLinkHtml = String.format('<a id="{0}" href="{1}" class="ms-searchNotification" title="{2}">' + 
                                $htmlEncode($resource("rs_UpScopeActionPhrase")) +
                            '</a>', $htmlEncode(linkId), $urlHtmlEncode(upScopeUrl), $htmlEncode(upScopeTitle));
                            return String.format($htmlEncode($resource("rs_Upscope")), upScopeLinkHtml);
                        }
                    };
ms_outHtml.push(''
,'                    <div id="UpScopeLinkTop" class="ms-srch-upscope-top">'
,'                        ', getUpScopeHtml("UpScopeLinkTopA") ,''
,'                    </div>'
);                     
                }
                var showSortOptions = ctx.ClientControl.get_showSortOptions() && !$isEmptyArray(ctx.DataProvider.get_availableSorts());
                var showLanguageOptions = ctx.ClientControl.get_showLanguageOptions() && !$isNull(appStates.languages) && appStates.languages.length > 1;

                if(showSortOptions || showLanguageOptions){                    
                    var resultHeaderClassNoEncode = "ms-metadata";
                    if (showLanguageOptions && !showSortOptions && ctx.ClientControl.get_repositionLanguageDropDown()) {
                         resultHeaderClassNoEncode += " ms-srch-result-resultHeader-onlyLanguage";
                    }
ms_outHtml.push('                '
,'                    <div id="ResultHeader" class="', resultHeaderClassNoEncode ,'">'
,'                        <ul id="Actions">                    '
); 
                            if(showLanguageOptions){
                               var languageDropDownClassNoEncode = "";
                               if (ctx.ClientControl.get_repositionLanguageDropDown()) {
                                    languageDropDownClassNoEncode = "ms-srch-result-languageDropDown";                                   
                               }
ms_outHtml.push(''
,'                                <li id="Lang" class="', languageDropDownClassNoEncode ,'">'
,'                                    <select title="', $htmlEncode(Srch.Res.rs_LanguageDescription) ,'" id="LangSel" onchange="$getClientControl(this).changeQueryLanguage(this.value);">'
); 
                                    for (var i = 0; i < appStates.languages.length; i++) {
                                        var lang = appStates.languages[i];
                                        if(ctx.DataProvider.get_currentQueryState().l == lang.id) { 
ms_outHtml.push(''
,'                                            <option selected="selected" value="', $htmlEncode(lang.id) ,'">'
,'                                                ', $htmlEncode(lang.label) ,''
,'                                            </option>'
); 
                                        } else { 
ms_outHtml.push(''
,'                                            <option value="', $htmlEncode(lang.id) ,'">'
,'                                                ', $htmlEncode(lang.label) ,''
,'                                            </option>'
); 
                                        } 
                                    } 
ms_outHtml.push(''
,'                                    </select>'
,'                                </li>'
);                      
                            }
                            if(showSortOptions){
                                var availableSorts = ctx.DataProvider.get_availableSorts();
ms_outHtml.push(''
,'                                <li id="Sortby">'
,'                                    <select title="', $htmlEncode(Srch.Res.rs_SortDescription) ,'" id="SortbySel" onchange="$getClientControl(this).sortOrRank(this.value);">'
); 
                                    for (var i = 0; i < availableSorts.length; i++) {
                                        var cplxsort = availableSorts[i];
                                        if(!$isNull(cplxsort)){
                                            if(ctx.DataProvider.getSortRankName() == cplxsort.name) { 
ms_outHtml.push(''
,'                                                <option selected="selected" value="', $htmlEncode(cplxsort.name) ,'">'
,'                                                    ', $htmlEncode(cplxsort.name) ,''
,'                                                </option>'
); 
                                            } else { 
ms_outHtml.push(''
,'                                                <option value="', $htmlEncode(cplxsort.name) ,'">'
,'                                                    ', $htmlEncode(cplxsort.name) ,''
,'                                                </option>'
); 
                                            } 
                                        }
                                    } 
ms_outHtml.push(''
,'                                    </select>'
,'                                </li>'
);                      	
                            }
ms_outHtml.push(''
,'                        </ul>'
,'                    </div>'
);
                }
                var hasPersonalResults = false;
                if(ctx.ClientControl.get_showPersonalFavorites()){                    

                    var pfTable = Srch.U.getTableOfType(ctx.ClientControl.get_currentResultTableCollection(), Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.personalFavoriteResults);
                    if(!$isNull(pfTable)){                        
                        var pfRows = pfTable[Srch.U.PropNames.resultRows];
                        if(!$isNull(pfRows) && pfRows.length > 0)
                        {
                            var pfRow = pfRows[0];
                            if(!$isNull(pfRow) && !$isEmptyString(pfRow.Title) && !$isEmptyString(pfRow.Url))
                            {
                                hasPersonalResults = true;
                                var pfId = ctx.ClientControl.get_nextUniqueId();
                                var pfTitle = Srch.U.getHighlightedProperty(pfId, pfRow, "Title");
                                if ($isEmptyString(pfTitle))
                                    pfTitle = $htmlEncode(pfRow.Title);
ms_outHtml.push('                '
,'                                <div class="ms-srch-result-personalResult">'
,'                                    <div class="ms-srch-result-personalResult-prompt">', $htmlEncode(Srch.Res.qs_PersonalResultTitleSingular) ,'</div>                                    '
,'                                    <a id="PersonalResult" class="ms-textLarge" href="', $urlHtmlEncode(pfRow.Url) ,'">', Srch.U.trimTitle(pfTitle, Srch.U.titleTruncationLength, 2) ,'</a>'
,'                                </div>'
); 
                            }
                        }
                    } 
                }
                if(ctx.ClientControl.get_showDidYouMean() && !hasPersonalResults){                    
                    if(!$isNull(ctx.ListData) && !$isEmptyString(ctx.ListData.SpellingSuggestion)){
                        var dymTerm = ctx.ListData.SpellingSuggestion;
                        var dymHtml = "<a id='DidYouMean' class='ms-bold ms-italic' href='#' onclick='$getClientControl(this).changeQueryTerm(\"" + $scriptEncode(dymTerm) + "\");return Srch.U.cancelEvent(event);'>" + $htmlEncode(dymTerm) + "</a>";
ms_outHtml.push('                '
,'                        <div class="ms-srch-result-didYouMean">'
,'                            ', String.format($htmlEncode(Srch.Res.rs_DidYouMean), dymHtml) ,''
,'                        </div>'
); 
                    } 
                }
                if (Srch.U.isPageInEditMode()){
                    var sourcesHtml = "<a href='" + $urlHtmlEncode(ctx.ScriptApplicationManager.get_resultSourcesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_ResultSources) + "</a>";
                    var displayTemplatesHtml = "<a href='" + $urlHtmlEncode(ctx.ScriptApplicationManager.get_displayTemplatesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_DisplayTemplate) + "</a>";
                    var resultTypesHtml = "<a href='" + $urlHtmlEncode(ctx.ScriptApplicationManager.get_resultTypesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_ResultType) + "</a>";
                    var queryRulesHtml = "<a href='" + $urlHtmlEncode(ctx.ScriptApplicationManager.get_queryRulesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_QueryRules) + "</a>";
                    var configureResultsUrl = "javascript:HelpWindowKey(\"WSSEndUser_ConfigureResultsWPInEditMode\")";
                    var configureResultsLink = "<a href=" + configureResultsUrl + ">" + $htmlEncode(Srch.Res.rs_Edit_ConfigureSearchResults_Link) + "</a>";  
ms_outHtml.push(' '
,'                    <div id="EditMode-CustomizingResults" class="ms-trcnoti-base ms-srch-msg ms-srch-msg-border">'
,'                        <div class="ms-srch-msg-section">'
,'                            <h2 class="ms-accentText">', $htmlEncode(Srch.Res.rs_Edit_ResultSourcesTitle) ,'</h2>'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_ResultSourcesDescription), sourcesHtml) ,'</div>'
,'                        </div>'
,'                        <div class="ms-srch-msg-section">'
,'                            <h2 class="ms-accentText">', $htmlEncode(Srch.Res.rs_Edit_ResultTypesTitle) ,'</h2>'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_ResultTypesDescription), displayTemplatesHtml, resultTypesHtml) ,'</div>'
,'                        </div>'
,'                        <div class="ms-srch-msg-section">'
,'                            <h2 class="ms-accentText">', $htmlEncode(Srch.Res.rs_Edit_QueryRulesTitle) ,'</h2>'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_QueryRulesDescription), queryRulesHtml) ,'</div>'
,'                        </div>'
,'                        <div class="ms-srch-msg-section">'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_ConfigureSearchResults), configureResultsLink) ,'</div>'
,'                        </div>'
,'                    </div>'
);                     
                }
ms_outHtml.push('        '
,'                <div id="Groups" class="ms-srch-result-groups">'
); 
                    ctx.ListDataJSONGroupsKey = "ResultTables"; 
ms_outHtml.push(''
,'                    ', ctx.RenderGroups(ctx) ,''
);
                    if(ctx.ClientControl.get_shouldShowNoResultMessage()){
ms_outHtml.push(''
,'                        <div id="NoResult" class="ms-srch-result-noResults">'
);
                            var emptyMessage = ctx.ClientControl.get_emptyMessage();
                            if ($isEmptyString(emptyMessage))
                            {
ms_outHtml.push(''
,'                                <div class="ms-textLarge ms-srch-result-noResultsTitle">', $htmlEncode(Srch.Res.rs_NoResultsTitle) ,'</div>'
,'                                <div>', $htmlEncode(Srch.Res.rs_NoResultsSuggestions) ,'</div>'
,'                                <ul>'
,'                                    <li>', $htmlEncode(Srch.Res.rs_NoResultsSpelling) ,'</li>'
,'                                    <li>', $htmlEncode(Srch.Res.rs_NoResultsDifferentTerms) ,'</li>'
,'                                    <li>', $htmlEncode(Srch.Res.rs_NoResultsGeneralTerms) ,'</li>'
,'                                    <li>', $htmlEncode(Srch.Res.rs_NoResultsFewerTerms) ,'</li>'
);
                                    if(ctx.DataProvider.get_currentQueryState().r){
ms_outHtml.push(''
,'                                        <li>', $htmlEncode(Srch.Res.rs_NoResultsRefiners) ,'</li>'
);
                                    }
                                    var searchTipsUrl = "javascript:HelpWindowKey(\"WSSEndUser_SearchTips\")";
                                    var searchTipsLink = "<a href=" + searchTipsUrl + ">" + $htmlEncode(Srch.Res.rs_NoResultsTips_Link) + "</a>";
ms_outHtml.push(''
,'                                    <li>', String.format($htmlEncode(Srch.Res.rs_NoResultsTips), searchTipsLink) ,'</li>'
,'                                </ul>'
);
                            }
                            else
                            {
ms_outHtml.push(''
,'                                ', $htmlEncode(emptyMessage) ,''
);
                            }
ms_outHtml.push(''
,'                        </div>'
);
                    }
ms_outHtml.push(''
,'                </div>'
,''
);
                if(ctx.ClientControl.get_showUpScopeMessage()){
ms_outHtml.push(''
,'                    <div id="UpScopeLinkBottom" class="ms-srch-upscope-bottom">'
,'                        ', getUpScopeHtml("UpScopeLinkBottomA") ,''
,'                    </div>'
); 
                } 

                if(ctx.ClientControl.get_showPaging()){
                    var pagingInfo = ctx.ClientControl.get_pagingInfo();
                    if(!$isEmptyArray(pagingInfo)){ 
ms_outHtml.push(''
,'                        <ul id="Paging" class="ms-srch-Paging">'
); 
                        for (var i = 0; i < pagingInfo.length; i++) {
                            var pl = pagingInfo[i];
                            if(!$isNull(pl)) {
                                var imagesUrl = GetThemedImageUrl('searchresultui.png');
                                if(pl.startItem == -1) { 
                                    var selfLinkId = "SelfLink_" + pl.pageNumber;
ms_outHtml.push(''
,'                                    <li id="PagingSelf"><a id="', $htmlEncode(selfLinkId) ,'">', $htmlEncode(pl.pageNumber) ,'</a></li>'
); 
                                } else if(pl.pageNumber == -1) { 
                                    var iconClass = Srch.U.isRTL() ? "ms-srch-pagingNext" : "ms-srch-pagingPrev";                                    
ms_outHtml.push(''
,'                                    <li id="PagingImageLink"><a id="PageLinkPrev" href="#" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled ms-verticalAlignMiddle" title="', $htmlEncode(pl.title) ,'" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem) ,');return Srch.U.cancelEvent(event);">'
,'                                        <span class="ms-promlink-button-image">'
,'                                            <img src="', $urlHtmlEncode(imagesUrl) ,'" class="', $htmlEncode(iconClass) ,'" alt="', $htmlEncode(pl.title) ,'" />'
,'                                        </span>'
,'                                    </a></li>'
); 
                                } else if(pl.pageNumber == -2) { 
                                    var iconClass = Srch.U.isRTL() ? "ms-srch-pagingPrev" : "ms-srch-pagingNext";
ms_outHtml.push(''
,'                                    <li id="PagingImageLink"><a id="PageLinkNext" href="#" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled ms-verticalAlignMiddle" title="', $htmlEncode(pl.title) ,'" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem) ,');return Srch.U.cancelEvent(event);">'
,'                                        <span class="ms-promlink-button-image">'
,'                                            <img src="', $urlHtmlEncode(imagesUrl) ,'" class="', $htmlEncode(iconClass) ,'" alt="', $htmlEncode(pl.title) ,'" />'
,'                                        </span>'
,'                                    </a></li>'
); 
                                } else { 
                                    var pageLinkId = "PageLink_" + pl.pageNumber;
ms_outHtml.push(''
,'                                    <li id="PagingLink"><a id="', $htmlEncode(pageLinkId) ,'" href="#" title="', $htmlEncode(pl.title) ,'" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem) ,');return Srch.U.cancelEvent(event);">', $htmlEncode(pl.pageNumber) ,'</a></li>'
); 
                                }
                            }
                        } 
ms_outHtml.push(''
,'                        </ul>'
); 
                    }
                } 
ms_outHtml.push(''
,''
,'                '
); 
            } 
ms_outHtml.push(''
,'        '
,'        </div>'
,'     '
,'    </div>'
,'    '
,'    </div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_0ecba0b0d110499a954799ee246f2f53() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fControl_RightPartResults.js", DisplayTemplate_0ecba0b0d110499a954799ee246f2f53);
}

}
RegisterTemplate_0ecba0b0d110499a954799ee246f2f53();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fControl_RightPartResults.js"), RegisterTemplate_0ecba0b0d110499a954799ee246f2f53);
}