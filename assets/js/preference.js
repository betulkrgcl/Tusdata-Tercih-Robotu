$(document).ready(function () {
    preferenceAct.Init();
});

const preferenceAct = {
    Init: function () {
        this.ButtonController();
        this.TableList();
        this.DraggableItem();
        this.SearchInput();
        this.PreferenceSave();
    },
// buttons control
    ButtonController: function () {
        const rejectBtn = document.querySelector('.preference-list__buttons__reject');
        const acceptBtn = document.querySelector('.preference-list__buttons__accept');
        const buttons1 = document.querySelector('.preference-list__buttons');
        const buttons2 = document.querySelector('.preference-list__buttons-2');
        const buttons3 = document.querySelector('.preference-list__buttons-3');
        const returnPreference = document.querySelector('.preference-list__buttons__return-preference')
        const returnBtn = document.querySelector('.preference-list__buttons__return-back');
        const preferenceList = document.querySelectorAll('.preference__item__content');
        const mainList = document.querySelector('.ui-sortable.ui-sortable-main');
        const popupList = document.querySelector('.ui-sortable.ui-sortable-popup')

        rejectBtn.addEventListener('click', () => {
            this.RemoveAttributeElementAndOpacity(buttons1, buttons2, mainList, popupList, '.5', '.5');
            buttons2.classList.add('preference-list__buttons-2--flex-layout');
            j = -1;
            preferenceList.forEach(item => {
                item.children[0].innerText = '';
                item.children[1].setAttribute('disabled', 'disabled');
                item.children[2].innerText = '';
                item.parentElement.classList.add('unsortable')
            })
        });

        returnBtn.addEventListener('click', () => {
            this.RemoveAttributeElementAndOpacity(buttons2, buttons1, mainList, popupList, '1', '1');
            buttons2.classList.remove('preference-list__buttons-2--flex-layout');

            preferenceList.forEach(item => {

                item.children[1].removeAttribute('disabled');
            });

            this.RemoveSelectedAttr();

        });

        returnPreference.addEventListener('click', () => {
            this.RemoveAttributeElementAndOpacity(buttons3, buttons1, mainList, popupList, '1', '1');
            buttons3.classList.remove('preference-list__buttons-2--flex-layout');

            preferenceList.forEach(item => {
                item.children[1].removeAttribute('disabled');
                if (item.parentElement.getAttribute('data-select') === 'true') {
                    item.parentElement.classList.remove('unsortable')
                }
            });
        })


        acceptBtn.addEventListener('click', () => {
            this.RemoveAttributeElementAndOpacity(buttons1, buttons3, mainList, popupList, '.5', '.5');
            buttons3.classList.add('preference-list__buttons-2--flex-layout');

            preferenceList.forEach(item => {
                item.children[1].setAttribute('disabled', 'disabled');
                item.parentElement.classList.add('unsortable')
            });
        })
    },

    RemoveAttributeElementAndOpacity: function (element1, element2, element3, element4, opacityValue) {
        element1.classList.add('display-none');
        element2.classList.remove('display-none');
        element3.style.opacity = opacityValue
        element4.style.opacity = opacityValue
    },

    TableList: function () {
        const variable = [];
        let j = -1;

        const preference = document.querySelector('.ui-sortable-main');
        const preferencePopup = document.querySelector('.ui-sortable-popup');
        const tableList = document.querySelectorAll('.table__item');

        tableList.forEach(tableItem => {
            tableItem.addEventListener('click', (i) => {
                j++;

                if ((tableItem.getAttribute('is-selected')) === 'false') {

                    variable.push({ prefix: (i.target.parentElement.children[0].textContent), departmentName: (i.target.parentElement.children[1].textContent) });
                    preference.children[j].children[1].children[0].textContent = variable[j].prefix;
                    preference.children[j].children[1].children[2].textContent = variable[j].departmentName;
                    preference.children[j].classList.remove('unsortable');
                    preference.children[j].setAttribute('data-select', 'true');
                    preferencePopup.children[j].children[1].children[0].textContent = variable[j].prefix;
                    preferencePopup.children[j].children[1].children[2].textContent = variable[j].departmentName;
                    preferencePopup.children[j].classList.remove('unsortable');
                    tableItem.setAttribute('is-selected', 'true');
                    hidePopup();
                } else {
                    j--;
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

                }
            });

        });
    },

    DraggableItem: function () {
        /********* Adding more items ************/
        $("#listing > li").draggable({
            connectToSortable: '#sortable',
            cursor: 'pointer',
            helper: 'clone',
            revert: 'true'
        });
        //$("#ul").append($("<li>").text("Some Text.")); 

        /********* Sortable ***********/
        $('.ui-sortable-main').sortable({
            items: "li:not(.unsortable)",
            revert: true,
            update: function (event, ui) {

                $('#sortable').children().each(function (i) {
                    //var id = $(this).attr('data-post-id')
                    // ,order = $(this).index() + 1;
                    $(this).attr('id', i);
                    var x = $(this).find('.hidden');
                    $(this).find("input").val(i);
                    $(this).find(x).removeClass("hidden").addClass("remove");

                    $(this).find(".remove").attr('id', i);

                    $('.ui-sortable-handle-main span').each(function (i) {
                        var humanNum = i + 1;
                        $(this).html(humanNum + '');
                    });

                });

            }
        });

        $('.ui-sortable-popup').sortable({
            items: "li:not(.unsortable)",
            revert: true,
            update: function (event, ui) {

                //$('#console').html('<b>posts[id] = pos:</b><br>');

                $('#sortable').children().each(function (i) {
                    //var id = $(this).attr('data-post-id')
                    // ,order = $(this).index() + 1;
                    $(this).attr('id', i);

                    var x = $(this).find('.hidden');
                    $(this).find("input").val(i);
                    $(this).find(x).removeClass("hidden").addClass("remove");


                    $(this).find(".remove").attr('id', i);

                    $('.ui-sortable-handle-popup span').each(function (i) {
                        var humanNum = i + 1;
                        $(this).html(humanNum + '');
                    });

                });

            }
        });

        $('.remove-main').click(function (e) {
            preferenceAct.RemoveSelectedAttr($(this));
            // removeSelectedAttr($(this));
            // removeMainListItem($(this));
            preferenceAct.RemoveMainListItem($(this));


            $('.ui-sortable-handle-main').children().each(function (i) {
                //var id = $(this).attr('data-post-id')
                // ,order = $(this).index() + 1;
                $(this).attr('id', i);

                var x = $(this).find('.hidden');
                $(this).find("input").val(i);
                $(this).find(x).removeClass("hidden").addClass("remove-main");
                $(this).find(".remove-main").attr('id', i);
            });
        });

        // $('.remove-popup').click(function () {
        //     preferenceAct.RemoveSelectedAttr($(this));


        //     const prefixCode = $('.preference__item__program-code');

        //     $.each(prefixCode, function (index, value) {
        //         if ($(this).parent().children()[0].innerText == value.innerText) {
        //             preferenceAct.RemoveMainListItem($(this));
        //         }
        //     });

        //     $(this).parent().children('div').remove();
        //     $(this).parent().parent().classList.add('unsortable');
        //     $('.ui-sortable-handle-popup').children().each(function (i) {
        //         $(this).attr('id', i);

        //         var x = $(this).find('.hidden');
        //         $(this).find("input").val(i);
        //         $(this).find(x).removeClass("hidden").addClass("remove-popup");
        //         $(this).find(".remove-popup").attr('id', i);
        //     });
        // });

    },

    RemoveSelectedAttr: function (e) {
        if (e) {
            document.querySelectorAll('.table__item>.department-prefix').forEach(item => {
                if (item.innerText == e.parent().children()[0].textContent) {
                    item.parentElement.setAttribute('is-selected', 'false');
                }
            })
        } else {
            $('.table__item').attr('is-selected', 'false');
        }
    },

    RemoveMainListItem: function (e) {

        e.parent().parent().addClass('unsortable');
        e.parent().children()[0].textContent = '';
        e.parent().children()[2].textContent = '';
        this.RemovePopupListItem();
    },

    RemovePopupListItem: function () {
        $(this).parent().addClass('unsortable');
        $('.preference__item__content').children()[0].textContent = '';
        $('.preference__item__content').children()[2].textContent = '';
    },

    SearchInput: function () {
        const searching = document.querySelector('.search-input');
        searching.addEventListener('input', _ => {
            const value = searching.value.toUpperCase();
            const departmentName = document.querySelectorAll('.department-name');
            const prefixCode = document.querySelectorAll('.department-prefix');

            if (Number(value)) {
                prefixCode.forEach(code => {
                    let codeNewName = code.innerText;
                    console.log(codeNewName.includes(value));
                    code.parentElement.style.display = "table-row";
                    if (!codeNewName.includes(value)) {
                        code.parentElement.style.display = "none";
                    }
                });
            } else {
                departmentName.forEach(element => {
                    let elementNewName = element.innerText.toUpperCase();
                    element.parentElement.style.display = "table-row";
                    if (!elementNewName.includes(value)) {
                        element.parentElement.style.display = "none";
                    }
                });
            }
        })


        document.querySelector('.popup__container__exit').addEventListener('click', () => {
            document.querySelector('.search-input').value = '';
            preferenceAct.ClearInput();
        });
    },

    ClearInput: function () {
        const clear = document.querySelectorAll('.table__item');
        clear.forEach(item => {
            item.style.display = "table-row";
        })
    },

    PreferenceSave: function () {
        const preferenceSave = document.querySelector(".preference-list__buttons__save");
        preferenceSave.onclick = () => {
            Swal.fire({
                text: "Takvimi sıfırlamak istediğine emin misin?",
                title: 'Takvimi sıfırlamak üzeresin',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#E0144C',
                confirmButtonText: 'Takvimi Sıfırla',
                cancelButtonText: ' İptal Et'

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        text: "Takvim Sıfırlandı",
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Tamam</a>'
                    })
                    windows.reload();
                }
            })
        }
    },

    ClearSelected: function () {

    }
};


function RemovePopup(e) {

    preferenceAct.RemoveSelectedAttr($(e));

    const prefixCode = $('.preference__item__program-code');

    $.each(prefixCode, function (index, value) {
        if ($(e).parent().children()[0].innerText == value.innerText) {
            preferenceAct.RemoveMainListItem($(value));
        }
    });

    $(e).parent().children('div').remove();
    $(e).parent().parent().classList.add('unsortable');
    $('.ui-sortable-handle-popup').children().each(function (i) {
        $(e).attr('id', i);
        var x = $(e).find('.hidden');
        $(e).find("input").val(i);
        $(e).find(x).removeClass("hidden").addClass("remove-popup");
        $(e).find(".remove-popup").attr('id', i);
    });
}