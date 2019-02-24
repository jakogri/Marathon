'use strict';

var mongoose = require('mongoose');
var help_scripts = require('./HelpScripts');
var request = require('request')
var Schema = mongoose.Schema;
var cheerio = require('cheerio');

var schema = new Schema(
    {
        Month_year: String,
        Marathon_name: String,
        Start_date: String,
        End_date: String,
        Marathon_type: String,
        Marathon_address: String,
        Contact_person: String,
        Contact_address: String,
        Contact_telephone_number: String,
        Contact_email: String,
        Marathon_website: String
    });

var london_schema = new Schema(
    {
        Marathon_name: String,
        Name: String,
        Overall_place: String,
        Gender_place: String,
        Finish_time: String
    });


exports.FindAllMarathon = function(req, res, next)
{

    var ConnectString = help_scripts.ConnectStr();
    var MarathonList = mongoose.model('Marathon', schema);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    request('http://aims-worldrunning.org/calendar.html', function(err, res, data)
    {
        if (err) return console.error(err);
        var text_str;
        var Month_year_period;
        var Month_year = [];
        var Marathon_name = [];
        var Start_date = [];
        var End_date = [];
        var Marathon_type = [];
        var Contact_person = [];
        var Contact_address = [];
        var Contact_telephone_number = [];
        var Contact_email = [];
        var Marathon_website = [];
        var Month_year_area = [];
        var Marathon_str;
        var Date_str;
        var Marathon_address = [];
        var Detailed_str;
        var Marathon_type_code;
        var NewMarathonList = [];
        var i, j, k, m, r;
        var $ = cheerio.load(data);
        text_str = $('body').html();
        text_str = text_str.replace(/\n/g, '');
        text_str = text_str.replace(/&#x2013;/g, '-');
        text_str = text_str.replace(/&#xDA;/g, "Ú");
        text_str = text_str.replace(/&#xED;/g, "i");
        text_str = text_str.replace(/&#xF3;/g, "ó");
        text_str = text_str.replace(/&#x2019;/g, "'");
        text_str = text_str.replace(/&#xE1;/g, "á");
        text_str = text_str.replace(/&#xE9;/g, "é");
        text_str = text_str.replace(/&#xFC;/g, "ü");
        text_str = text_str.replace(/&#xE0;/g, "á");
        text_str = text_str.replace(/&#x161;/g, "s");
        text_str = text_str.replace(/&#x144;/g, "n");
        text_str = text_str.replace(/&#xBC;/g, "¼");
        text_str = text_str.replace(/&#xF8;/g, "0");
        text_str = text_str.replace(/&#x130;/g, "I");
        text_str = text_str.replace(/&#xE7;/g, "ç");
        text_str = text_str.replace(/&#xE3;/g, "ã");
        text_str = text_str.replace(/&#x141;/g, "Ł");
        text_str = text_str.replace(/&#x17A;/g, "ź");
        text_str = text_str.replace(/&#x10C;/g, "Č");
        text_str = text_str.replace(/&#xE8;/g, "è");
        text_str = text_str.replace(/&#xF6;/g, "ö");
        text_str = text_str.replace(/&#xF1;/g, "ñ");
        text_str = text_str.replace(/&#xDF;/g, "ß");
        text_str = text_str.replace(/&#xC1;/g, "Á");
        text_str = text_str.replace(/&#xFA;/g, "ú");
        text_str = text_str.replace(/&#x17E;/g, "ž");
        text_str = text_str.replace(/&#xD8;/g, "Ø");
        text_str = text_str.replace(/&#x10D;/g, "č");
        text_str = text_str.replace(/&#xE4;/g, "ä");
        text_str = text_str.replace(/&#x159;/g, "ř");
        text_str = text_str.replace(/&#x117;/g, "ė");
        text_str = text_str.replace(/&#xA0;/g, " ");
        text_str = text_str.replace(/&#x201C;/g, "“");
        text_str = text_str.replace(/&#x201D;/g, "”");
        text_str = text_str.replace(/&#x131;/g, "ı");
        text_str = text_str.replace(/&#x15F;/g, "ş");
        text_str = text_str.replace(/&#x142;/g, "ł");
        text_str = text_str.replace(/&#xBA;/g, "º");
        text_str = text_str.replace(/&#xFD;/g, "ý");
        text_str = text_str.replace(/&#xEE;/g, "î");
        text_str = text_str.replace(/&#x107;/g, "ć");
        text_str = text_str.replace(/&#xC7;/g, "Ç");
        text_str = text_str.replace(/&#xC3;/g, "Ã");
        text_str = text_str.replace(/&#xAA;/g, "ª");

        text_str = text_str.substring(text_str.indexOf('calendar-month-header') + 21, text_str.indexOf('<div id="aims-sidebar" class="four columns omega">'));
        i = 0;
        j = 0;
        while (i != 1)
        {
            if (text_str.indexOf('calendar-month-header') != -1)
            {
                Month_year_area[j] = text_str.substring(0, text_str.indexOf('calendar-month-header'));
                text_str = text_str.substring(text_str.indexOf('calendar-month-header') + 21);
                j++;
                }
                else
                {
                    Month_year_area[j] = text_str;
                    text_str = '';
                    i = 1;
                };
        };
        m = 0;
        for (i = 0; i < Month_year_area.length; i++)
        {
            Month_year_period = Month_year_area[i].substring(2, Month_year_area[i].indexOf('</h3>'));
            j = 0;
            r = 0;
            while (j != 1)
            {

                Month_year[m] = Month_year_period;
                if (Month_year_area[i].indexOf('calendar-item') != -1)
                {
                    Month_year_area[i] = Month_year_area[i].substring(Month_year_area[i].indexOf('calendar-item') + 15 );
                    if (Month_year_area[i].indexOf('calendar-item') != -1)
                    {
                        Marathon_str =  Month_year_area[i].substring(0, Month_year_area[i].indexOf('calendar-item'));
                        r = 0;
                    }
                    else
                    {
                        Marathon_str = Month_year_area[i];
                        r = 1;
                    };
                   Start_date[m] = 'tbc';
                   End_date[m] = 'tbc';
                   if (Marathon_str.indexOf('calendar-date-tbc') != -1)
                    {
                        Start_date[m] = 'tbc';
                        End_date[m] = 'tbc';
                    }
                    else if (Marathon_str.indexOf('calendar-date-compressed') != -1)
                    {
                        Date_str = Marathon_str.substring(Marathon_str.indexOf('calendar-date-compressed'));
                        Date_str = Date_str.substring(Date_str.indexOf('>') + 1, Date_str.indexOf('</span>'));
                        Start_date[m] = Date_str.substring(0, Date_str.indexOf('-'));
                        End_date[m] = Date_str.substring(Date_str.indexOf('-') + 1);
                    }
                    else
                    {
                        Start_date[m] = Marathon_str.substring(Marathon_str.indexOf('calendar-date') + 15, Marathon_str.indexOf('</div>'));
                        End_date[m] = Marathon_str.substring(Marathon_str.indexOf('calendar-date') + 15, Marathon_str.indexOf('</div>'));
                    };
                    Marathon_str = Marathon_str.substring(Marathon_str.indexOf('calendar-race-name') + 20);
                    Marathon_str = Marathon_str.substring(Marathon_str.indexOf('<a href='));
                    Marathon_name[m] = Marathon_str.substring(Marathon_str.indexOf('>') + 1, Marathon_str.indexOf('</a>'));
                    Marathon_address[m] = Marathon_str.substring(Marathon_str.indexOf('<a href=') + 9, Marathon_str.indexOf('>') - 1);
                    Marathon_type_code = Marathon_str.substring(Marathon_str.indexOf('<span>') + 6, Marathon_str.indexOf('</span>'));
                    Marathon_type[m] = '';
                    if (Marathon_type_code.indexOf('M') != -1)
                    {
                        if (Marathon_type[m] == '')  Marathon_type[m] = 'Marathon'
                        else  Marathon_type[m] = Marathon_type[m] + ', Marathon';
                    };
                    if (Marathon_type_code.indexOf('H') != -1)
                    {
                        if (Marathon_type[m] == '')  Marathon_type[m] = 'Half Marathon'
                        else  Marathon_type[m] = Marathon_type[m] + ', Half Marathon';
                    };
                    if (Marathon_type_code.indexOf('R') != -1)
                    {
                        if (Marathon_type[m] == '')  Marathon_type[m] = 'Road Race'
                        else  Marathon_type[m] = Marathon_type[m] + ', Road Race';
                    };
                    if (Marathon_type_code.indexOf('U') != -1)
                    {
                        if (Marathon_type[m] == '')  Marathon_type[m] = 'Ultra Marathon'
                        else  Marathon_type[m] = Marathon_type[m] + ', Ultra Marathon';
                    };

                        NewMarathonList[m] = new MarathonList(
                            {
                                Month_year: Month_year[m].trim(),
                                Marathon_name: Marathon_name[m].trim(),
                                Start_date: Start_date[m].trim(),
                                End_date: End_date[m].trim(),
                                Marathon_type: Marathon_type[m].trim(),
                                Marathon_address: Marathon_address[m].trim(),
                                Contact_person: '',
                                Contact_address: '',
                                Contact_telephone_number: '',
                                Contact_email: '',
                                Marathon_website: ''
                            });
                        if ((i >= (Month_year_area.length - 1)) && (r == 1))
                        {
                            NewMarathonList[m].save(function (err, thor) {
                                if (err) return console.error(err);
                                mongoose.disconnect();
                                next();
                            });
                        }
                        else
                        {
                            NewMarathonList[m].save(function (err, thor) {
                                if (err) return console.error(err);
                            });
                        };

                    m++;
                }
                else j = 1;

            };

        };


    });
};

exports.FindAllMarathonDetail = function(req, res, next)
{
    var ConnectString = help_scripts.ConnectStr();
    var MarathonList = mongoose.model('Marathon', schema);
    var MarathonValue = mongoose.model('Marathon', schema);
    //var cur_id = [];
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    MarathonList.find({}, function (err, docs)
    {
        if (err) return handleError(err);
        var cur_id = [];
        var i;
        for(i = 0; i < docs.length; i++)
        {
            //help_scripts.sleep(1000);
            if (docs[i].Marathon_address != '')
            {
                cur_id[i] = docs[i].id;
                request(docs[i].Marathon_address, function (err, res, data_detail) {
                    if (err) return console.error(err);

                    var Contact_person = '';
                    var Contact_address = '';
                    var Contact_telephone_number = '';
                    var Contact_email = '';
                    var Marathon_website = '';
                    var Marathon_name = '';


                    var $detail = cheerio.load(data_detail);
                    var Detailed_str = $detail('body').html();

                    Detailed_str = Detailed_str.replace(/\n/g, '');
                    Detailed_str = Detailed_str.replace(/&#x2013;/g, '-');
                    Detailed_str = Detailed_str.replace(/&#xDA;/g, "Ú");
                    Detailed_str = Detailed_str.replace(/&#xED;/g, "i");
                    Detailed_str = Detailed_str.replace(/&#xF3;/g, "ó");
                    Detailed_str = Detailed_str.replace(/&#x2019;/g, "'");
                    Detailed_str = Detailed_str.replace(/&#xE1;/g, "á");
                    Detailed_str = Detailed_str.replace(/&#xE9;/g, "é");
                    Detailed_str = Detailed_str.replace(/&#xFC;/g, "ü");
                    Detailed_str = Detailed_str.replace(/&#xE0;/g, "á");
                    Detailed_str = Detailed_str.replace(/&#x161;/g, "s");
                    Detailed_str = Detailed_str.replace(/&#x144;/g, "n");
                    Detailed_str = Detailed_str.replace(/&#xBC;/g, "¼");
                    Detailed_str = Detailed_str.replace(/&#xF8;/g, "0");
                    Detailed_str = Detailed_str.replace(/&#x130;/g, "I");
                    Detailed_str = Detailed_str.replace(/&#xE7;/g, "ç");
                    Detailed_str = Detailed_str.replace(/&#xE3;/g, "ã");
                    Detailed_str = Detailed_str.replace(/&#x141;/g, "Ł");
                    Detailed_str = Detailed_str.replace(/&#x17A;/g, "ź");
                    Detailed_str = Detailed_str.replace(/&#x10C;/g, "Č");
                    Detailed_str = Detailed_str.replace(/&#xE8;/g, "è");
                    Detailed_str = Detailed_str.replace(/&#xF6;/g, "ö");
                    Detailed_str = Detailed_str.replace(/&#xF1;/g, "ñ");
                    Detailed_str = Detailed_str.replace(/&#xDF;/g, "ß");
                    Detailed_str = Detailed_str.replace(/&#xC1;/g, "Á");
                    Detailed_str = Detailed_str.replace(/&#xFA;/g, "ú");
                    Detailed_str = Detailed_str.replace(/&#x17E;/g, "ž");
                    Detailed_str = Detailed_str.replace(/&#xD8;/g, "Ø");
                    Detailed_str = Detailed_str.replace(/&#x10D;/g, "č");
                     Detailed_str = Detailed_str.replace(/&#xE4;/g, "ä");
                    Detailed_str = Detailed_str.replace(/&#x159;/g, "ř");
                    Detailed_str = Detailed_str.replace(/&#x117;/g, "ė");
                    Detailed_str = Detailed_str.replace(/&#xA0;/g, " ");
                    Detailed_str = Detailed_str.replace(/&#x201C;/g, "“");
                    Detailed_str = Detailed_str.replace(/&#x201D;/g, "”");
                    Detailed_str = Detailed_str.replace(/&#x131;/g, "ı");
                    Detailed_str = Detailed_str.replace(/&#x15F;/g, "ş");
                    Detailed_str = Detailed_str.replace(/&#x142;/g, "ł");
                    Detailed_str = Detailed_str.replace(/&#xBA;/g, "º");
                    Detailed_str = Detailed_str.replace(/&#xFD;/g, "ý");
                    Detailed_str = Detailed_str.replace(/&#xEE;/g, "î");
                    Detailed_str = Detailed_str.replace(/&#x107;/g, "ć");
                    Detailed_str = Detailed_str.replace(/&#xC7;/g, "Ç");
                    Detailed_str = Detailed_str.replace(/&#xC3;/g, "Ã");
                    Detailed_str = Detailed_str.replace(/&#xAA;/g, "ª");

                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('race-details-box') + 16);
                    Marathon_name = Detailed_str.substring(Detailed_str.indexOf('<h1>') + 4, Detailed_str.indexOf('</h1>'));
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('race-contact-details') + 20);
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('</h4>') + 5);
                    Detailed_str = Detailed_str.substring(0, Detailed_str.indexOf('</div>'));
                    Contact_person = Detailed_str.substring(0, Detailed_str.indexOf('<br'));
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('<br') + 6);
                    var k = 0;
                    Contact_address = '';
                    while (k != 1) {
                        if ((Detailed_str.indexOf('<br')  != -1))
                        {
                            if (Contact_address == '')  Contact_address = Detailed_str.substring(0, Detailed_str.indexOf('<br'));
                            else Contact_address = Contact_address.trim() + ', ' + Detailed_str.substring(0, Detailed_str.indexOf('<br'));
                            Detailed_str = Detailed_str.substring(Detailed_str.indexOf('<br') + 6);
                        }
                        else k = 1;
                    };
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('>T: <a href=') + 12);
                    Contact_telephone_number = Detailed_str.substring(Detailed_str.indexOf('>') + 1, Detailed_str.indexOf('</a></p>'));
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('</a></p>') + 8);
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('>') + 1);
                    Contact_email = Detailed_str.substring(Detailed_str.indexOf('>') + 1, Detailed_str.indexOf('</a></p>'));
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('</a></p>') + 8);
                    Detailed_str = Detailed_str.substring(Detailed_str.indexOf('>') + 1);
                    Marathon_website = Detailed_str.substring(Detailed_str.indexOf('>') + 1, Detailed_str.indexOf('</a></p>'));
                    MarathonValue.update({Marathon_address: res.request.uri.href} , { $set: { Contact_person: Contact_person.trim(),Contact_address: Contact_address.trim(),
                        Contact_telephone_number: Contact_telephone_number.trim(),  Contact_email: Contact_email.trim(), Marathon_website: Marathon_website.trim() }}, {multi: true}, function (err, tank)
                    {
                        if (err) return handleError(err);
                        if (i >= (docs.length - 1))
                        {
                            mongoose.disconnect();
                            next();
                        };
                    });
                });
            };
        };
    });
};



exports.GetLondonMarathon = function(req, res, next)
{
    var ConnectString = help_scripts.ConnectStr();
    var LondonMarathon = mongoose.model('London_marathon', london_schema);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    request('http://www.marathonguide.com/results/browse.cfm?MIDD=16160424', function(err, res, data)
    {
        if (err) return console.error(err);
        var $ = cheerio.load(data);
        var str = $('form').html();
        var OutPut = [];
        var parent_url = res.request.uri.href;
        var options = [];
        var i = 0;
        var j = 0;

        var cur_url = [];
        var max_place;
        str = str.substring(str.indexOf('>Overall Results</option>') + 25, str.indexOf('</select><p>'));
        while(i != 1)
        {
            if (str.indexOf('</option>') != -1)
            {
                OutPut[j] = str.substring(str.indexOf('>') + 1, str.indexOf('</option>'));
                str = str.substring(str.indexOf('</option>') + 9);
                j++;
            }
            else i = 1;
        };
        max_place = OutPut[OutPut.length - 1].substring(OutPut[OutPut.length - 1].indexOf('-') + 1).trim();
        for (i = 0; i < OutPut.length; i++)

        for (i = 0; i < OutPut.length; i++)
        {
            cur_url[i] = parent_url + '&Gen=B&Begin=' + OutPut[i].substring(0, OutPut[i].indexOf('-')).trim() + '&End=' + OutPut[i].substring(OutPut[i].indexOf('-') + 1).trim() + '&Max=' + max_place;
            options[i] = {
                url: cur_url[i],
                timeout: 20000,
                headers: {
                    'Referer': parent_url
                }
            };
            help_scripts.sleep(1000);
            request(options[i], function(err, res, data1_detail)
            {
                if (err)
                {
                    console.log(res.request.uri.href);
                    return console.error(err);
                }
                var $detail = cheerio.load(data1_detail);
                var detail_str = $detail('html').html();
                var url_str = res.request.uri.href;
                var NewLondonMarathon = [];
                var Name;
                var overall_place;
                var Gender_place;
                var Finish_time;
                var end_number = parseInt(url_str.substring(url_str.indexOf('&End=') + 5, url_str.indexOf('&Max=')));
                var start_number = parseInt(url_str.substring(url_str.indexOf('&Begin=') + 7, url_str.indexOf('&End=')));
                detail_str = detail_str.replace(/\n/g, '');
                detail_str = detail_str.replace(/\t/g, '');
                detail_str = detail_str.replace(/\r/g, '');
                detail_str = detail_str.replace(/&nbsp;/g, '');
                detail_str = detail_str.replace(/&#xA0;/g, '');
                detail_str = detail_str.substring(detail_str.indexOf('BoxTitleOrange') + 16);
                var marathon_name = detail_str.substring(0, detail_str.indexOf(','));
                detail_str = detail_str.substring(detail_str.indexOf('<th>BQ*</th>') + 12);
                detail_str = detail_str.substring(detail_str.indexOf('<tr'), detail_str.indexOf('</table>'));
                for (var k = 0; k <= (end_number - start_number); k++)
                {
                    detail_str = detail_str.substring(detail_str.indexOf('<tr') + 4);
                    detail_str = detail_str.substring(detail_str.indexOf('<td nowrap=') + 11);
                    Name = detail_str.substring(detail_str.indexOf('>') + 1, detail_str.indexOf('(')).trim();
                    detail_str = detail_str.substring(detail_str.indexOf('<td align=') + 10);
                    Finish_time = detail_str.substring(detail_str.indexOf('>') + 1, detail_str.indexOf('</td>'));
                    detail_str = detail_str.substring(detail_str.indexOf('<td align=') + 10);
                    overall_place = detail_str.substring(detail_str.indexOf('>') + 1, detail_str.indexOf('</td>'));
                    detail_str = detail_str.substring(detail_str.indexOf('<td align=') + 10);
                    Gender_place = detail_str.substring(detail_str.indexOf('>') + 1, detail_str.indexOf('</td>'));
                    console.log(marathon_name + ' '  +  Name + ' ' + overall_place + ' ' +  Gender_place + ' ' + Finish_time);
                    NewLondonMarathon[k] = new LondonMarathon(
                        {
                            Marathon_name: marathon_name,
                            Name: Name,
                            Overall_place: overall_place,
                            Gender_place: Gender_place,
                            Finish_time: Finish_time
                        });
                    if ((k >= (end_number - start_number))&&(end_number >= parseInt(max_place)))
                    {
                           NewLondonMarathon[k].save(function (err, thor) {
                            if (err) return console.error(err);
                            mongoose.disconnect();
                            next();
                        });
                    }
                    else
                    {
                        NewLondonMarathon[k].save(function (err, thor) {
                            if (err) return console.error(err);

                        });
                    };

                };
            });
        };
     });
};

