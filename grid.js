(function () {
	let arrFixedColumns = [];
	let arrHeaders = [];

	$(document).ready(() => {
		init(response);

		$('#btnRenderTable').on('click', function () {
			let arrCheckedOptions = $('input:checkbox:checked');
			let arrSize = arrCheckedOptions.size();
			if (arrSize == 0) {
				alert('Please select atleast 1 column');
			} else if (arrSize > 2) {
				alert('Please select maximum 2 columns');
			} else {
				arrFixedColumns = arrCheckedOptions.map(function () {
					return $(this).val();
				}).get();
				$('#data-grid').html(createTable(response));
			}
		});
	});


	function init(response) {
		$('#data-grid').html(renderHeaderOptions(getAllHeaders(response[0])));
	};

	function getAllHeaders(firstRecord) {
		Object.keys(firstRecord).forEach((key) => {
			arrHeaders.push(key);
		});
		return arrHeaders;
	};

	function renderHeaderOptions(arrHeaders) {
		let frmOptions = '<h2>Please select any 2 locking columns</h2><br><table id="tblOptions"><tbody>';
		for (let i = 0; i < arrHeaders.length; i++) {
			if (i % 5 == 0) {
				frmOptions += (i == 0) ? '<tr>' : '</tr><tr>';
			}
			frmOptions += '<td><input type="checkbox" name="' + arrHeaders[i] + '" value="' + arrHeaders[i] + '">' +
				arrHeaders[i] + '</td>';
		};
		frmOptions += '</tbody></table><br><button type="button" id="btnRenderTable">Render Table</button>';
		return frmOptions;
	};

	function createTable(response) {
		let tableHtml = '<div class="outer"><div class="inner"><table>';
		tableHtml += createHeaders();
		tableHtml += createRows(response);
		tableHtml += '</table></div></div>';
		return tableHtml;
	};

	function createHeaders() {
		let fixRowHtml = '';
		let scrollRowHtml = '';
		let headerHtml = '<tr>';

		arrHeaders.forEach((key) => {
			if (arrFixedColumns.includes(key)) {
				fixRowHtml += '<th class=' + (arrFixedColumns.length > 1 ? "fix" : "fix-one") + '><div>' + key + '</div></th>';
			} else {
				scrollRowHtml += '<th><div class ="title">' + key + '</div></th>';
			}
			headerHtml = fixRowHtml + scrollRowHtml + '</tr>';
		});
		return headerHtml;
	};

	function createRows(records) {
		let tableHtml = '';
		for (let i = 0; i < records.length; i++) {
			tableHtml += '<tr>' + createRow(records[i]) + '</tr>';
		}
		return tableHtml;
	};

	function createRow(record) {
		let rowHtml = '';
		let fixRowHtml = '';
		let scrollRowHtml = '';

		Object.keys(record).forEach((key) => {
			if (arrFixedColumns.includes(key)) {
				fixRowHtml += '<td class=' + (arrFixedColumns.length > 1 ? "fix" : "fix-one") + '><div>' + isURL(record[key]) + '</div></td>';
			} else {
				scrollRowHtml += '<td><div>' + isURL(record[key]) + '</div></td>';
			}
		});

		rowHtml = fixRowHtml + scrollRowHtml;
		return rowHtml;
	};

	function isURL(content) {
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if (content.match(regex)) {
			return '<a href="' + content + '" target="_blank">' + content + '</a>';
		} else {
			return content;
		}
	};
})();