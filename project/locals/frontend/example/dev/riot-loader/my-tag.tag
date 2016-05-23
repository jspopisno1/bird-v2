
var riotmap = {
    section: require('./section.tag')
}

require('./my-tag-style.less')

<my-tag>
    <h1 ha={ name } onClick={test}>hello { name }</h1>
    <div riot-tag="section"></div>

    <script>
        this.name = opts.name || 'world';
        require('./my-tag.js').call(this, opts)
    </script>
</my-tag>
