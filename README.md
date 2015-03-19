# jTableScroll
A powerful jQuery extension that automates scrolling and fixed headers and footers.

By default it will size a table to it's parent container, fix the position of the header and footer, add horizontal and vertical scrolling as needed, and resize reactively to window resize events.

## Homepage & Demo
http://mikeallisononline.com/Projects/jquery/jTableScroll/

## Install
```
(bower): bower install jtablescroll
(npm): npm install jTableScroll
(nuget): Install-Package jtablescroll
```

## License
MIT

## Copyright
2013 Mike Allison

## Example Table
```html
<table id="tableToScroll">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Foot 1</td>
            <td>Foot 2</td>
            <td>Foot 3</td>
        </tr>
    </tfoot>
</table>
```

## Javascript
```javascript
<script src="jquery.jTableScroll-1.6.0.js"></script>
<script>
    $('#tableToScroll').jTableScroll(options);
</script>
```

## Options (JSON object)
```javascripts
{
    reactive: (bool)(optional)(default: true) enable reactive sizing to parent control
    width: (int)(optional) desired max width in pixels
    height: (int)(optional) desired height in pixels
    backgroundcolor: (string)(optional)(default: #fffff) table header bg color
}
```


