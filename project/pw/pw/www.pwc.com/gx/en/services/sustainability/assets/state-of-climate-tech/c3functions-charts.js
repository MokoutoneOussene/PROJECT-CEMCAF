// JavaScript Document

// Gobals
var c3nLoopedOffset = 0;
var c3nVisiblePosition = 0;
var c3nScrollTop;
var c3nAnimationThreshold;
var $c3animatedComps;

$(document).ready( function() {
	
	
	// Add any necessary scroll depenedent elements to the animated comps list so progressive reveal can handle them
	$c3animatedComps = $('div.c3_chart, div.c3_feature_numbers, div.c3_feature_stat');
	
	$('div.c3_chart').on('click', 'a.c3_a_toggle_yq', function(e) {
		c3toggleYQ($(this));
		e.preventDefault();
	});
	
	$('div.c3_chart').on('click', 'a.c3_a_toggle_ry', function(e) {
		c3toggleRY($(this));
		e.preventDefault();
	});
	
	$('div.c3_chart').on('click', 'small.c3_small_key ul li', function(e) {
		if ($(this).hasClass('c3_table_key_line')) {
			c3keyHighlightLine($(this), e.isTrigger);
		} else {
			c3keyHighlight($(this), e.isTrigger);
		}
		e.preventDefault();
	});
	
	$('section.c3_section_3_tab_carousel').on('click', 'nav > ul > li > a', function(e) {
		c3slewCarousel($(this));
		e.preventDefault();
	});
	
	// Kick of the data loaders
	if ($('div.c3_chart').length > 0) {
		c3loadData();
	}
	
	// Listen for scrolling (only after we have code ready)
	$(window).scroll(function() {
		
		c3progressiveReveal();
        
        
		
            $('div.c3_feature_stat').each(function () {
                if ($(this).parent().hasClass('c3_inview') && !$(this).hasClass('c3_stopcounting')) {
                   //alert($(this).children().children().children('.c3_count').attr('data-stat'))
                    $(this).addClass('c3_stopcounting');
                    $(this).children().children().children('.c3_count').prop('Counter',0).stop().animate({
                        Counter: $(this).children().children().children('.c3_count').attr('data-stat')
                        }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        }

                    });
                } else if (!$(this).parent().hasClass('c3_inview')) {
                    $(this).removeClass('c3_stopcounting');
                    $(this).children().children().children('.c3_count').text('0');
                }
            });
        
		
	});
	
	// Listen for resizing to prevent lines breaking apart
	$(window).resize(function() {
	
		$('svg.c3_svg_line_chart line, svg.c3_svg_line_chart_year line').each( function(i) {
			// Add dynamic CSS properties to sequence the anmiation of each line to create a stroke path effect
			$(this).css({'stroke-dasharray': parseFloat($(this).get(0).getTotalLength()) * 1.1, 'stroke-dashoffset': parseFloat($(this).get(0).getTotalLength()) * 1.1});
		});
		
	});

});

function c3loadData() {
	// Create new array to hold the extracted data
	var c3aChartData = [];
	// Create some local reusable vars that can hold structural information
	var c3sChartType = 'Chart type';
	var c3sChartTitle = 'Chart title';
	var c3sChartKey = 'Chart key';
	var c3sChartSource = 'Chart source';
	var c3sChartSubType = 'Chart subtype';
	var c3sChartSpecial = 'Chart special';
	// Create a new array to hold the row group names
	var c3aChartRowGroups = [];
	// Iterate over all the chart containers and find their data tables to add to the arrays
	$('div.c3_chart table.c3_table_data').each( function(i) {
		
		// Extract top level chart data
		c3sChartType = $(this).attr('data-charttype');
		c3sChartTitle = $(this).children('caption').html();
		c3sChartKey = $(this).children('tfoot').find('td.c3_table_key').html();
		c3sChartSource = $(this).children('tfoot').find('td.c3_table_source').html();
		c3sChartSubType = $(this).attr('data-chartsubtype');
		c3sChartSpecial = (typeof $(this).attr('data-chartspecial') !== 'undefined') ? $(this).attr('data-chartspecial') : 'none';
		c3sChartYAxisLeft = (typeof $(this).attr('data-yaxisleft') !== 'undefined') ? $(this).attr('data-yaxisleft') : 'none';
		c3sChartYAxisRight = (typeof $(this).attr('data-yaxisright') !== 'undefined') ? $(this).attr('data-yaxisright') : 'none';
		// Push an empty array on for each table
		c3aChartData.push([c3sChartType, c3sChartTitle, c3sChartKey, c3sChartSource, c3sChartSubType, c3sChartSpecial, c3sChartYAxisLeft, c3sChartYAxisRight]);
		// Reset any arrays which might accumulate as they iterate each chart
		c3aChartRowGroups.push([]);
		// Keep a log of which year group we're in by updating it each time we loop
		var c3sThisYear = 'None';
		// Start by iterating the rows
		$(this).find('tbody tr').each( function(ii) {
			// Push an empty array on for each row
			c3aChartData[i].push([]);
			// Then iterate the cells
			$(this).children('td').each( function(iii) {
				// If the cell has rowspan, it's a group for use in x axis
				if (typeof $(this).attr('rowspan') !== 'undefined') {
					c3aChartRowGroups[i].push([$(this).text(), $(this).attr('rowspan')]);
					c3sThisYear = $(this).text();
				} else {
					// Update the global data array with the values for this answer
					c3aChartData[i][ii + 8].push([$(this).text(), $(this).attr('data-info'), $(this).attr('data-keystat'), c3sThisYear]);
				}
			});
		});
		
	});
	// Loop over the array (and it's inners) to remove the empties
	for (var i = c3aChartData.length - 1; i >= 0; i--) {
		for (var ii = c3aChartData[i].length - 1; ii >= 0; ii--) {
			if (c3aChartData[i][ii].length == 0) {
				c3aChartData[i].splice(ii, 1);
			}
		}
	}
	
	// Iterate over all the chart containers and call the function on each to build the chart
	$('div.c3_chart').each( function(i) {
		c3buildChart($(this), c3aChartData[i], i, c3aChartRowGroups[i], );
	});
	

}

function c3buildChart($thisChart, c3aChartData, c3sChartUid, c3aChartRowGroups) {

	console.log('------------- START NEW CHART ---------------');
	
	// Establish a UID for this chart for reference as necessary
	c3sChartUid = 'c3_chart_' + c3sChartUid;
	
	// Add the main title
	$thisChart.append('<div class="c3_div_header_group"></div>');
	$thisChart.children('div.c3_div_header_group').append('<h3>' + c3aChartData[1] + '</h3>');
	if ($thisChart.hasClass('c3_chart_style_quarterly_yearly')) {
		$thisChart.children('div.c3_div_header_group').append('<a class="c3_a_toggle_yq" href="#"><span class="c3_span_toggle_yq_year">By year</span><span class="c3_span_toggle_yq_quarter">By quarter</span></a>');
	} else if ($thisChart.hasClass('c3_chart_style_rolling_quarter')) {
		$thisChart.children('div.c3_div_header_group').append('<a class="c3_a_toggle_ry" href="#"><span class="c3_span_toggle_ry_year"><span>By rolling 12-month average</span></span><span class="c3_span_toggle_ry_quarter">By quarter</span></a>');
	}
	$thisChart.children('div.c3_div_header_group').append('<h4>Click legend to explore the data</h4>');
	$thisChart.children('div.c3_div_header_group').append('<small class="c3_small_key"><h4>Click legend to explore</h4>' + c3prepChartKey(c3aChartData[2]) + '</small>');
	
	// Add the axis lables
	if (c3aChartData[6] != 'none') {
		$thisChart.children('div.c3_div_header_group').append('<div class="c3_div_yaxis_left">' + c3aChartData[6] + '</div>');
	}
	if (c3aChartData[7] != 'none') {
		$thisChart.children('div.c3_div_header_group').append('<div class="c3_div_yaxis_right">' + c3aChartData[7] + '</div>');
	}
	
	// Localise the array to simplify the structure
	var c3aLocalChartData = [];
	
	// Loop over and strip out the data we don't need for the chart (start at 8 to avoid the top level chart data)
	for(var i = 8; i < c3aChartData.length; i++) {
		c3aLocalChartData.push(c3aChartData[i]);
	}
	
	// Add a containing element to hold the bars so we can rotate them
	$thisChart.append('<div class="c3_div_bar_positioner"><ul class="c3_ul_row_groups"></ul><div class="c3_div_bar_rotator"></div></div>');
	
	// We need the max values of a full stack so we can work out percentages relative to it
	var c3nLocalMaxQ = 0;
	var c3nStackAcca = 0;
	
	// Declare an array that we can use to keep a record of the keystats as we loop over the main table (used primarily for line chart overlays)
	var c3aKeyStats = [];
	
	// We need a preemptive loop and inner loop to work out the max value of a whole stack
	for (var i = 0; i < c3aLocalChartData.length; i++) {
		// Reset the stack accumulator before each inner stack is looped
		c3nStackAcca = 0;
		// Iterate the inner stack values (skip the zero element because it's the label not a number to add)
		for (var ii = 1; ii < c3aLocalChartData[i].length; ii++) {
			// Exclude the value from any titles if the stat has the keystat marker (used mainly for things like line chart overlays)
			if (typeof c3aLocalChartData[i][ii][2] === 'undefined' || c3aLocalChartData[i][ii][2] == 'no') {
				// Add the inner looped value to the total
				c3nStackAcca += parseFloat(c3aLocalChartData[i][ii][0]);
			} else {
				c3aKeyStats.push(c3aLocalChartData[i][ii]);
			}
		}
		
		// Update the max value if the total is greater than the previous max value
		if (c3nStackAcca > c3nLocalMaxQ) {
			c3nLocalMaxQ = c3nStackAcca;
		}
	}
	
	// Send the local max to the rounding function
	c3nLocalMaxQ = c3roundAxes(c3nLocalMaxQ);
	
	// Count total of bars so we can have a smooth progressive animate delay
	var c3nTotalBars = 0;
	var c3nTotalBarContainers = 0;
	
	// Loop over the inner data to generate the bar structures
	for (var i = 0; i < c3aLocalChartData.length; i++) {
		// Append the uid to give the indivual containers a unique name
		var c3sBarUID = c3sChartUid + '_' + i;
		$thisChart.find('div.c3_div_bar_rotator').append('<div id="' + c3sBarUID + '" class="c3_div_bar_container c3_div_bar_container_' + c3aChartData[4] + ' c3_data_yeargroup_stack_' + c3aLocalChartData[i][0][3].replace('*','') + '" data-yeargroup="' + c3aLocalChartData[i][0][3] + '"><strong>' + c3aLocalChartData[i][0][0] + '</strong></div>');
		// Declare a fresh local array to store the values only for this stack (used to store the quareterly values on the stack so we can switch between yearly and quarterly)
		var c3aThisQuarterlySectorValues = [];
		for (var ii = 1; ii < c3aLocalChartData[i].length; ii++) {
			
			// Exclude the value from any titles if the stat has the keystat marker (used mainly for things like line chart overlays)
			if (typeof c3aLocalChartData[i][ii][2] === 'undefined' || c3aLocalChartData[i][ii][2] == 'no') {
			
				// It's possible that the value will be multiple so we split it just in case
				var c3sThisValueAsString = c3aLocalChartData[i][ii][0];
				var c3nThisValueAsNumber = parseInt(c3sThisValueAsString);
				// var c3nThisValueAsNumber = parseInt(c3sThisValueAsString) / c3nLocalMaxQ * 100;
				var c3sSpanClass = (c3nThisValueAsNumber < 5) ? 'c3_span_right' : 'c3_span_left' ;
				$('div#' + c3sBarUID).append('<div class="c3_div_chart_bar_actual c3_data_yeargroup_' + c3aLocalChartData[i][0][3].replace('*','') + ' c3_div_chart_bar_actual_colour_' + c3aLocalChartData[i][ii][1] + '" style="background-color: var(--c3_' + c3aLocalChartData[i][ii][1] + '); transition: width 0.5s ease ' + (0.01 * c3nTotalBars) + 's, height 1s ease ' + (0.01 * c3nTotalBars) + 's, top 1s ease ' + (0.01 * c3nTotalBars) + 's, opacity 0.25s linear; z-index: ' + (c3aLocalChartData[i].length - ii) + ';" data-storedvalue="' + c3nThisValueAsNumber + '"><span class="' + c3sSpanClass + '">' + c3sThisValueAsString + '</span></div>');
				// Increment the bars counter (used primarily for the animate delay)
				c3nTotalBars++;
				// Add the local data to the local array
				c3aThisQuarterlySectorValues.push(c3nThisValueAsNumber);
			
			}
			
		}
		c3nTotalBarContainers++;
		// Store the quarterly values on each stack so they can be easly reverted to when switching between yearly and quarterly
		$('div#' + c3sBarUID).attr('data-thisquartersectortotals', c3aThisQuarterlySectorValues);
	}
	
	// Set the bar container width based on the number of items
	$thisChart.find('div.c3_div_bar_container').css('height', 'calc(100% / ' + c3nTotalBarContainers + ')');
	
	// Introduce condition to decide which type of extension (if any) we need on this chart
	if ($thisChart.hasClass('c3_chart_style_quarterly_yearly')) {
		c3integrateYearAmalgamation($thisChart, c3aChartData, c3aLocalChartData, c3sChartUid, c3aChartRowGroups, c3nLocalMaxQ, c3aKeyStats, c3nTotalBarContainers);
		// Call the function to create a line chart over the top
		if (c3aKeyStats.length > 0) {
			c3buildLineChart(c3aKeyStats, $thisChart);
		}
	} else if ($thisChart.hasClass('c3_chart_style_rolling_quarter')) {
		c3integrateRollingQuarter($thisChart, c3aChartData, c3aLocalChartData, c3sChartUid, c3aChartRowGroups, c3nLocalMaxQ, c3aKeyStats, c3nTotalBarContainers);
		// Call the function to create a line chart over the top
		if (c3aKeyStats.length > 0) {
			c3buildLineChartRolling(c3aKeyStats, $thisChart);
		}
	} else {
		c3integrateStaticChart($thisChart, c3aChartData, c3aLocalChartData, c3sChartUid, c3aChartRowGroups, c3nLocalMaxQ, c3aKeyStats, c3nTotalBarContainers);
		// Call the function to create a line chart over the top
		if (c3aKeyStats.length > 0) {
			c3buildLineChart(c3aKeyStats, $thisChart);
		}
	}
	
	// Add the source
	$thisChart.append('<small class="c3_small_source">' + c3aChartData[3] + '</small>');
	
}

function c3integrateYearAmalgamation($thisChart, c3aChartData, c3aLocalChartData, c3sChartUid, c3aChartRowGroups, c3nLocalMaxQ, c3aKeyStats, c3nTotalBarContainers) {
	
	// We need the max values of a full stack so we can work out percentages relative to it
	var c3nLocalMaxY = 0;
	
	// Add the colum/row groups to the positioner and store the total for the year group
	for (var i = 0; i < c3aChartRowGroups.length; i++) {
		// Variable to accumulate the total value of the year
		var c3nThisYearGroupTotal = 0;
		// Array to hold the sector-based values for each stack
		var c3aThisSectorTotals = [];
		// Add up the values in this year group so we can use it for maxing and ranging
		$thisChart.find('div.c3_data_yeargroup_' + (c3aChartRowGroups[i][0]).replace('*','')).each( function() {
			c3nThisYearGroupTotal += parseInt($(this).children('span').text());
			// First check if the array has already been populated by a previous loop by checking if the array length is greater than the current index
			if (c3aThisSectorTotals.length + 1 > $(this).index()) {
				// if it is longer (i.e. already populated) then add the current value to the existing
				c3aThisSectorTotals[$(this).index() - 1] = c3aThisSectorTotals[$(this).index() - 1] + parseInt($(this).children('span').text());
			} else {
				// If it's not already populated then push it on the array
				c3aThisSectorTotals.push(parseInt($(this).children('span').text()));
			}
		});
		
		// Send the yearly sector totals to the stacks for use when switching between quearterly and yearly
		$thisChart.find('div.c3_data_yeargroup_stack_' + c3aChartRowGroups[i][0].replace('*','')).attr('data-thisyearsectortotals', c3aThisSectorTotals);
		
		// Add the year group label
		$thisChart.find('ul.c3_ul_row_groups').append('<li data-thisyeartotal="' + c3nThisYearGroupTotal + '" data-thisyearsectortotals="' + c3aThisSectorTotals + '" style="width: calc(100% / ' + c3nTotalBarContainers + ' * ' + c3aChartRowGroups[i][1] + ')"><span>' + c3aChartRowGroups[i][0] + '</span></li>');
		
		// Update the yearly max if we need to
		if (c3nThisYearGroupTotal > c3nLocalMaxY) {
			c3nLocalMaxY = c3nThisYearGroupTotal;
		}
		
	}
	
	// Send the local max to the rounding function
	c3nLocalMaxY = c3roundAxes(c3nLocalMaxY);
	
	// Finally, loop back over every bar to refactor it against the yearly total
	$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
		var c3sThisStoredValue = parseInt($(this).attr('data-storedvalue')) / c3nLocalMaxY * 100;
		$(this).attr('data-storedvalue', c3sThisStoredValue + '%');
	});
	
	// Store both max values locally on the chart container
	$thisChart.attr('data-thismaxq', c3nLocalMaxQ);
	$thisChart.attr('data-thismaxy', c3nLocalMaxY);
	
	// Set the initial magnification of the chart to be quarterly compatible
	$thisChart.find('div.c3_div_bar_rotator').css('width', 50 * parseInt($thisChart.attr('data-thismaxy')) / parseInt($thisChart.attr('data-thismaxq')) + '%');
	
	// Now we have to create the axes
	c3buildAxis($thisChart, 'left', c3nLocalMaxY, c3roundAxes(c3nLocalMaxY), 'scalable');
	
}

function c3integrateRollingQuarter($thisChart, c3aChartData, c3aLocalChartData, c3sChartUid, c3aChartRowGroups, c3nLocalMaxQ, c3aKeyStats, c3nTotalBarContainers) {
	
	// console.log('c3integrateRollingQuarter');
	
	// For the purposes of this function, yearly totals/values refer to the rolling/accumulated values
	
	// We need the max values of a full stack so we can work out percentages relative to it
	var c3nLocalMaxY = 0;
	
	// The loop/maths we need to perform is based on current stack - 1, 2 or 3. The year group isn't relevant here...
	$thisChart.find('div.c3_div_bar_container_stacked').each( function(i) {
		// We must be at least 3 iterations in or we won't have historic data availble to average
		if (i > 3) {
			// Variable to accumulate the ROLLING AVERAGE of this quarter and the last 3 quarters
			var c3nThisYearGroupTotal = 0;
			// Array to hold the sector-based values for each stack
			var c3aThisSectorTotals = [];
			
			// Loop over the previous 3 quarters to extract their values
			for (var ii = 0; ii < 4; ii++) {
				// Get the looped stack's index so we can use it as a seedvalue
				var c3nThisStackIndex = $(this).index();
				var $targetStack = $(this).parent().children('div.c3_div_bar_container_stacked:nth-child(' + ((c3nThisStackIndex + 1) - ii) + ')');
				// console.log('----------- NEW STACK ----------');
				// console.log('THIS STACK ID: ' + $targetStack.attr('ID'));
				// Inner loop over the actual bars in the stack
				$targetStack.children('div.c3_div_chart_bar_actual').each( function(iii) {
					// Accumulate the total of sub bars in the stack so we can later divide by the number of stacks to arrive at the average value
					c3nThisYearGroupTotal += parseFloat($(this).children('span').text());
					
					// console.log('Inner bar value: ' + parseFloat($(this).children('span').text()));
				
					// First check if the array has already been populated by a previous loop by checking if the array length is greater than the current index
					if (c3aThisSectorTotals.length + 1 > $(this).index()) {
						// if it is longer (i.e. already populated) then add the current value to the existing
						c3aThisSectorTotals[$(this).index() - 1] = c3aThisSectorTotals[$(this).index() - 1] + parseInt($(this).children('span').text());
					} else {
						// If it's not already populated then push it on the array
						c3aThisSectorTotals.push(parseInt($(this).children('span').text()));
					}
				});
			}
			c3nThisYearGroupTotal = c3nThisYearGroupTotal / 4;
			// console.log('------------------------------------');
			// console.log('c3nThisYearGroupTotal: ' + c3nThisYearGroupTotal);
		
			// Convert all the values on the array to averages
			for (var ii = 0; ii < c3aThisSectorTotals.length; ii++) {
				c3aThisSectorTotals[ii] = c3aThisSectorTotals[ii] / 4;
			}
			
			// console.log('------------------------------------');
			// console.log('c3aThisSectorTotals: ' + c3aThisSectorTotals);
			
			// Send the yearly sector totals to the stacks for use when switching between quearterly and yearly
			$(this).attr('data-thisyearsectortotals', c3aThisSectorTotals);

			// Update the yearly max if we need to
			if (c3nThisYearGroupTotal > c3nLocalMaxY) {
				c3nLocalMaxY = c3nThisYearGroupTotal;
			}
		}
															 
	});
	
	// Add the year groups but miss the first one in this case because it's there for data purposes only
	for (var i = 1; i < c3aChartRowGroups.length; i++) {
		// Add the year group label
		$thisChart.find('ul.c3_ul_row_groups').append('<li style="width: calc(100% / ' + (c3nTotalBarContainers - 4) + ' * ' + c3aChartRowGroups[i][1] + ')"><span>' + c3aChartRowGroups[i][0] + '</span></li>');
	}
	
	// console.log('c3nLocalMaxY: ' + c3nLocalMaxY);
	
	// Send the local max to the rounding function
	c3nLocalMaxY = c3roundAxes(c3nLocalMaxY);
	
	// Store both max values locally on the chart container
	$thisChart.attr('data-thismaxq', c3nLocalMaxQ);
	$thisChart.attr('data-thismaxy', c3nLocalMaxY);
	
	// Set the initial magnification of the chart to be quarterly compatible (but allow for rolling averages being lower than quarterly peaks)
	if (parseInt($thisChart.attr('data-thismaxy')) > parseInt($thisChart.attr('data-thismaxq'))) {
		// Finally, loop back over every bar to refactor it against the yearly total
		$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
			var c3sThisStoredValue = parseInt($(this).attr('data-storedvalue')) / c3nLocalMaxY * 100;
			$(this).attr('data-storedvalue', c3sThisStoredValue + '%');
		});
		$thisChart.find('div.c3_div_bar_rotator').css('width', 50 * parseInt($thisChart.attr('data-thismaxy')) / parseInt($thisChart.attr('data-thismaxq')) + '%');
		// Now we have to create the axes
		c3buildAxis($thisChart, 'left', c3nLocalMaxY, c3roundAxes(c3nLocalMaxY), 'scalable');
	} else {
		// Finally, loop back over every bar to refactor it against the yearly total
		$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
			var c3sThisStoredValue = parseInt($(this).attr('data-storedvalue')) / c3nLocalMaxQ * 100;
			$(this).attr('data-storedvalue', c3sThisStoredValue + '%');
		});
		// $thisChart.find('div.c3_div_bar_rotator').css('width', 50 * parseInt($thisChart.attr('data-thismaxq')) / parseInt($thisChart.attr('data-thismaxy')) + '%');
		// Now we have to create the axes
		c3buildAxis($thisChart, 'left', c3nLocalMaxQ, c3roundAxes(c3nLocalMaxQ), 'scalable');
	}
	
	// Remove the first 4 bars as they are there for data purposes only
	$thisChart.find('div.c3_div_bar_container').each( function(i) {
		if (i < 4) {
			$(this).remove();
		} else {
			$(this).css('height', 'calc(100% / ' + (c3nTotalBarContainers - 4) + ')');
		}
	});
}

function c3integrateStaticChart($thisChart, c3aChartData, c3aLocalChartData, c3sChartUid, c3aChartRowGroups, c3nLocalMaxQ, c3aKeyStats, c3nTotalBarContainers) {
	
	// Add the colum/row groups to the positioner and store the total for the year group
	for (var i = 0; i < c3aChartRowGroups.length; i++) {
		
		// Add the year group label
		$thisChart.find('ul.c3_ul_row_groups').append('<li style="width: calc(100% / ' + c3nTotalBarContainers + ' * ' + c3aChartRowGroups[i][1] + ')"><span>' + c3aChartRowGroups[i][0] + '</span></li>');
		
	}
	
	// This is a substitute for the refactoring that the year toggle has to do. In this case we are just converting the stored absolute value to a percentage
	$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
		var c3sThisStoredValue = parseInt($(this).attr('data-storedvalue')) / c3nLocalMaxQ * 100;
		$(this).attr('data-storedvalue', c3sThisStoredValue + '%');
	});
	
	// Store both max values locally on the chart container
	$thisChart.attr('data-thismaxq', c3nLocalMaxQ);
	
	// Set the initial magnification of the chart to be quarterly compatible
	// $thisChart.find('div.c3_div_bar_rotator').css('width', 50 * parseInt($thisChart.attr('data-thismaxy')) / parseInt($thisChart.attr('data-thismaxq')) + '%');
	
	// Now we have to create the axes
	c3buildAxis($thisChart, 'left', c3nLocalMaxQ, c3roundAxes(c3nLocalMaxQ), 'scalable');
	
}

function c3buildAxis($thisChart, c3axis, c3nThisMax, c3nRoundTo, c3sAxisType) {
	
	/*
	console.log('------ c3buildAxis ------');
	console.log('Title: ' + $thisChart.find('h3').text());
	console.log('c3nThisMax: ' + c3nThisMax);
	console.log('c3nRoundTo: ' + c3nRoundTo);
	console.log('c3sAxisType: ' + c3sAxisType);
	*/
	
	// c3sAxisType has three options
	// 'scalable' = the left axis that moves with the quarterly/yearly switch
	// 'quarterly' = fixed right hand axis for the quarterly view
	// 'yearly' = fixed right hand axis for the yearly view
	
	// Check if we want left or right
	if (c3axis == 'left') {
		// Add 10 graduations
		for (var i = 0; i < 11; i++) {
			// Add an axis label and keyline
			$thisChart.find('div.c3_div_bar_rotator').append('<div class="c3_div_vertical_axis_left" style="left: ' + (10 * i) + '%"><span>' + c3roundAxisLabel(c3nThisMax, c3nThisMax / 10 * i) + '</span></div>');
		}
	} else {
		// Add 5 graduations
		for (var i = 0; i < 6; i++) {
			// Add an axis label and keyline
			$thisChart.find('div.c3_div_bar_positioner').append('<div class="c3_div_vertical_axis_right c3_div_vertical_axis_right_' + c3sAxisType + '" style="bottom: ' + (20 * i) + '%"><span>' + (c3nThisMax * (i * 20 / c3nRoundTo)).toFixed(0) + '</span></div>');
		}
	}
}

function c3prepChartKey(c3sThisKeyText) {
	var c3sCommonReplacement = 'style="border-left-color: ';
	c3sThisKeyText = c3sThisKeyText.replace('data-info="yellow"', c3sCommonReplacement + 'var(--c3_yellow)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="tangerine"', c3sCommonReplacement + 'var(--c3_tangerine)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="orange"', c3sCommonReplacement + 'var(--c3_orange)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="rose"', c3sCommonReplacement + 'var(--c3_rose)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="red"', c3sCommonReplacement + 'var(--c3_red)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="lightgrey"', c3sCommonReplacement + 'var(--c3_lightgrey)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="grey"', c3sCommonReplacement + 'var(--c3_grey)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="mediumgrey"', c3sCommonReplacement + 'var(--c3_mediumgrey)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="darkgrey"', c3sCommonReplacement + 'var(--c3_darkgrey)"');
	c3sThisKeyText = c3sThisKeyText.replace('data-info="black"', c3sCommonReplacement + 'var(--c3_black)"');
    
    c3sThisKeyText = c3sThisKeyText.replace('data-info="lightrose1"', c3sCommonReplacement + 'var(--c3_lightrose1)"');
    c3sThisKeyText = c3sThisKeyText.replace('data-info="lightyellow1"', c3sCommonReplacement + 'var(--c3_lightyellow1)"');
    c3sThisKeyText = c3sThisKeyText.replace('data-info="lightyellow2"', c3sCommonReplacement + 'var(--c3_lightyellow2)"');
    c3sThisKeyText = c3sThisKeyText.replace('data-info="darkyellow1"', c3sCommonReplacement + 'var(--c3_darkyellow1)"');
	return(c3sThisKeyText);
}

function c3clickPieKey($thisElement) {
	// Quick ref to the local svg
	var $c3localKey = $thisElement.closest('div').find('circle:nth-child(' + ($thisElement.index() + 2) + ')').trigger('click');
}

function c3progressiveReveal() {
	c3nLoopedOffset = 0;
	c3nVisiblePosition = 0;
	c3nScrollTop = $('html').scrollTop();
	c3nAnimationThreshold = parseFloat($(window).height()) * 0.5;
	$c3animatedComps.each( function() {
		c3nLoopedOffset = $(this).offset().top;
		c3nVisiblePosition = c3nLoopedOffset - c3nScrollTop - c3nAnimationThreshold;
		if (c3nVisiblePosition < 0) {
			$(this).addClass('c3_inview');
			// In the case of charts, they have to animate to a dynamic size so it has be targetted here
			if ($(this).hasClass('c3_chart')) { c3progressiveCharts($(this), true); }
		} else {
			$(this).removeClass('c3_inview');
			// In the case of charts, they have to animate to a dynamic size so it has be targetted here
			if ($(this).hasClass('c3_chart')) { c3progressiveCharts($(this), false); }
		}
	});
    
}

function c3progressiveCharts($thisChart, c3bIsInView) {
	// Swap the stored value into an inline CSS width to trigger the animation
	if (c3bIsInView) {
		$thisChart.find('svg.c3_svg_line_chart line, svg.c3_svg_line_chart_year line').each( function() {
			$(this).addClass('c3_svg_line_animated').removeClass('c3_svg_line_animated_reverse');
		});
		$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
			$(this).css('width', $(this).attr('data-storedvalue'));
		});
	} else {
		$thisChart.find('svg.c3_svg_line_chart line, svg.c3_svg_line_chart_year line').each( function() {
			$(this).addClass('c3_svg_line_animated_reverse').removeClass('c3_svg_line_animated');
		});
		$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
			$(this).css('width', '0%');
		});
	}
}

function c3toggleYQ($thisElement) {
	
	// Quick ref to the containing chart
	var $thisChart = $thisElement.closest('div.c3_chart');
	// The ratio may need to be up or down
	var c3nRatioYQUP = parseInt($thisChart.attr('data-thismaxy')) / parseInt($thisChart.attr('data-thismaxq'));
	var c3nRatioYQDOWN = parseInt($thisChart.attr('data-thismaxq')) / parseInt($thisChart.attr('data-thismaxy'));
	// Declare the var to hold the new height whether it's up or down
	var c3nNewRotatorHeight = 0;
	// Declare an array that can be ingerchanged between quarterly and yearly data
	var c3aArrayToUse = [];
	// Quick references to the chart maxes
	var c3nThisChartMaxQ = $thisChart.attr('data-thismaxq');
	var c3nThisChartMaxY = $thisChart.attr('data-thismaxy');
	
	// Decide if it's necessary to go up or down
	if ($thisElement.hasClass('c3_show_quarterly')) {
		// Set the chart height
		c3nNewRotatorHeight = 50 * c3nRatioYQUP;
		// Iterate each stack to adjust its bars
		$thisChart.find('div.c3_div_bar_container').each( function(i) {
			// Grab the right array of data
			c3aArrayToUse = $(this).attr('data-thisquartersectortotals').split(',');
			// Loop over the inner bars of this stack to adjust them
			$(this).children('div.c3_div_chart_bar_actual').each( function(ii) {
				var c3nThisValueAsPercentage = c3aArrayToUse[ii] / c3nThisChartMaxY * 100;
				$(this).css('width', c3nThisValueAsPercentage + '%');
				$(this).closest('div.c3_chart').removeClass('c3_div_chart_year');
				$(this).attr('data-storedvalue', c3nThisValueAsPercentage + '%');
			});
		});
	} else {
		// Set the chart height
		c3nNewRotatorHeight = (50 * c3nRatioYQUP) * c3nRatioYQDOWN;
		// Iterate each stack to adjust its bars
		$thisChart.find('div.c3_div_bar_container').each( function(i) {
			// Grab the right array of data
			c3aArrayToUse = $(this).attr('data-thisyearsectortotals').split(',');
			// Loop over the inner bars of this stack to adjust them
			$(this).children('div.c3_div_chart_bar_actual').each( function(ii) {
				var c3nThisValueAsPercentage = c3aArrayToUse[ii] / c3nThisChartMaxY * 100;
				$(this).css('width', c3nThisValueAsPercentage + '%');
				$(this).closest('div.c3_chart').addClass('c3_div_chart_year');
				$(this).attr('data-storedvalue', c3nThisValueAsPercentage + '%');
			});
		});
        
	}
	
	// And perform the zoom in or zoom out
	$thisChart.find('div.c3_div_bar_rotator').css('width', c3nNewRotatorHeight + '%');
	// Mark the button position
	$thisElement.toggleClass('c3_show_quarterly');
	// And update any value labels in view by triggering the click of any key elements that are currently selected
	$('small.c3_small_key ul li.selected').trigger('click');
	
}

function c3toggleRY($thisElement) {
	
	// Quick ref to the containing chart
	var $thisChart = $thisElement.closest('div.c3_chart');
	// The ratio may need to be up or down
	var c3nRatioYQUP = parseInt($thisChart.attr('data-thismaxq')) / parseInt($thisChart.attr('data-thismaxy'));
	var c3nRatioYQDOWN = parseInt($thisChart.attr('data-thismaxy')) / parseInt($thisChart.attr('data-thismaxq'));
	// Declare the var to hold the new height whether it's up or down
	var c3nNewRotatorHeight = 0;
	// Declare an array that can be ingerchanged between quarterly and yearly data
	var c3aArrayToUse = [];
	// Quick references to the chart maxes
	var c3nThisChartMaxQ = $thisChart.attr('data-thismaxq');
	var c3nThisChartMaxY = $thisChart.attr('data-thismaxy');
	
	// Decide if it's necessary to go up or down
	if ($thisElement.hasClass('c3_show_quarterly')) {
		// Set the chart height
		c3nNewRotatorHeight = (50 * c3nRatioYQUP) * c3nRatioYQDOWN;
		// Iterate each stack to adjust its bars
		$thisChart.find('div.c3_div_bar_container').each( function(i) {
			c3aArrayToUse = [];
			if (typeof $(this).attr('data-thisquartersectortotals') !== 'undefined') {
				c3aArrayToUse = $(this).attr('data-thisquartersectortotals').split(',');
			}
			// Loop over the inner bars of this stack to adjust them
			$(this).children('div.c3_div_chart_bar_actual').each( function(ii) {
				var c3nThisValueAsPercentage = c3aArrayToUse[ii] / c3nThisChartMaxQ * 100;
				$(this).css('width', c3nThisValueAsPercentage + '%');
				$(this).closest('div.c3_chart').removeClass('c3_div_chart_rolling_year');
				$(this).attr('data-storedvalue', c3nThisValueAsPercentage + '%');
			});
		});
		// Update the axis labels based on the position of the toggle
		$thisChart.find('div.c3_div_yaxis_left').fadeOut('fast', function() {
			$(this).text($thisChart.find('table').attr('data-yaxisleft'));
			$(this).fadeIn('fast');
		});
		$thisChart.find('div.c3_div_yaxis_right').fadeOut('fast', function() {
			$(this).text($thisChart.find('table').attr('data-yaxisright'));
			$(this).fadeIn('fast');
		});
		
	} else {
		// Set the chart height
		c3nNewRotatorHeight = 50 * c3nRatioYQUP;
		// Iterate each stack to adjust its bars
		$thisChart.find('div.c3_div_bar_container').each( function(i) {
			// Grab the right array of data
			c3aArrayToUse = [];
			if (typeof $(this).attr('data-thisyearsectortotals') !== 'undefined') {
				c3aArrayToUse = $(this).attr('data-thisyearsectortotals').split(',');
			}
			// Loop over the inner bars of this stack to adjust them
			$(this).children('div.c3_div_chart_bar_actual').each( function(ii) {
				var c3nThisValueAsPercentage = c3aArrayToUse[ii] / c3nThisChartMaxQ * 100;
				$(this).css('width', c3nThisValueAsPercentage + '%');
				$(this).closest('div.c3_chart').addClass('c3_div_chart_rolling_year');
				$(this).attr('data-storedvalue', c3nThisValueAsPercentage + '%');
			});
		});
		// Update the axis labels based on the position of the toggle
		$thisChart.find('div.c3_div_yaxis_left').fadeOut('fast', function() {
			$(this).text($thisChart.find('table').attr('data-yaxisleftrolling'));
			$(this).fadeIn('fast');
		});
		$thisChart.find('div.c3_div_yaxis_right').fadeOut('fast', function() {
			$(this).text($thisChart.find('table').attr('data-yaxisrightrolling'));
			$(this).fadeIn('fast');
		});
	}
	
	// And perform the zoom in or zoom out
	$thisChart.find('div.c3_div_bar_rotator').css('width', c3nNewRotatorHeight + '%');
	// Mark the button position
	$thisElement.toggleClass('c3_show_quarterly');
	// An update any value labels in view by triggering the click of any key elements that are currently selected
	$('small.c3_small_key ul li.selected').trigger('click');
	
	
}

function c3buildLineChart(c3aLocalData, $thisChart) {
	
	// -------- BUILD QUARTERLY LINE -------- // 
	
	// Var to store the max value of the array
	var c3nThisMaxQ = 0;
	var c3nThisMaxY = 0;
	// Get the max value in the array
	for (var i = 0; i < c3aLocalData.length; i++) {
		if (parseInt(c3aLocalData[i][0]) > c3nThisMaxQ) {
			c3nThisMaxQ = parseInt(c3aLocalData[i][0]);
		}
	}
	// But ensure it's always at least 10 otherwise the graduations on the axes will produce decimals that get rounded up and down ausing apparent duplicates or uneven spacing
	if (c3nThisMaxQ < 10) { c3nThisMaxQ = 10};
	// Round up the max to the nearest 100
	c3nThisMaxQ = c3roundAxes(c3nThisMaxQ);
	// Work out how far apart the points should be
	var c3nDistanceApart = 100 / c3aLocalData.length;
	// Build a string that creates the SVG
	var c3sSVGBuilder = '<svg class="c3_svg_line_chart" height="100%" width="100%">';
	// Loop the local data to create the lines
	for (var i = 0; i < c3aLocalData.length - 1; i++) {
		// Convert the values to percentage
		var c3nThisValueAsPercentage = 100 - (parseInt(c3aLocalData[i][0]) / c3nThisMaxQ * 100);
		var c3nThisNextValueAsPercentage = 100 - (parseInt(c3aLocalData[i + 1][0]) / c3nThisMaxQ * 100);
		// Add the new line to the the svg builder
		c3sSVGBuilder += '<line data-thisvalue="' + c3aLocalData[i][0] + '" data-nextvalue="' + c3aLocalData[i + 1][0] + '" x1="' + (c3nDistanceApart * i + (c3nDistanceApart / 2)) + '%" y1="' + c3nThisValueAsPercentage + '%" x2="' + (c3nDistanceApart * (i + 1) + (c3nDistanceApart / 2)) + '%" y2="' + c3nThisNextValueAsPercentage + '%" style="stroke: var(--c3_' + c3aLocalData[i][1] + '); transition: opacity 0.25s ease ' + (0.5 * i) + 's;" />';
	}
	c3sSVGBuilder += '</svg>';
	// Add the constructed SVG to the DOM
	$thisChart.children('div.c3_div_bar_positioner').append(c3sSVGBuilder);
	// Iterate the lines to set them up for the animation
	$thisChart.find('svg.c3_svg_line_chart line').each( function(i) {
		// Measure the line length so we can animate the the stroke dash array
		var c3nThisLineLength = parseInt($(this).get(0).getTotalLength()) * 1.1;
		// Add dynamic CSS properties to sequence the anmiation of each line to create a stroke path effect
		$(this).css({'stroke-dasharray': c3nThisLineLength, 'stroke-dashoffset': c3nThisLineLength, 'animation-delay': (i * 0.1) + 's'});
	});
	
	// Now we have to create the axes
	c3buildAxis($thisChart, 'right', c3nThisMaxQ, 100, 'quarterly');
	
	// -------- BUILD YEARLY LINE -------- // 
	
	// We need to extrapolate the yearly totals as we iterate the qauerters
	var c3aYearlyTotals = [];
	var c3sCurrentYear = 'None';
	for (var i = 0; i < c3aLocalData.length; i++) {
		// If the current year matches the iterated year we have to add it on
		if (c3aLocalData[i][3] == c3sCurrentYear) {
			c3aYearlyTotals[c3aYearlyTotals.length -1] = c3aYearlyTotals[c3aYearlyTotals.length -1] + parseInt(c3aLocalData[i][0]);
		} else {
			// If this is a new year, we need to push on the array
			c3aYearlyTotals.push(parseInt(c3aLocalData[i][0]));
			// Update current year to hold over until next loop
			c3sCurrentYear = c3aLocalData[i][3];
		}
	}
	// Get the max value in the yearly array
	for (var i = 0; i < c3aYearlyTotals.length; i++) {
		if (parseInt(c3aYearlyTotals[i]) > c3nThisMaxY) {
			c3nThisMaxY = parseInt(c3aYearlyTotals[i]);
		}
	}
	// Round up the max to the nearest 100
	// c3nThisMaxY = Math.ceil(c3nThisMaxY / 1000) * 1000;
	c3nThisMaxY = c3roundAxes(c3nThisMaxY);
	// Hold the centre points of the year groups
	var c3aCentrePointsOfYearGroups = [];
	// Work out the centre points of the year groups
	$thisChart.find('ul.c3_ul_row_groups li').each( function() {
		
		var c3nThisWidthAsPercentage = 100 / ($thisChart.find('ul.c3_ul_row_groups').outerWidth(true) / $(this).outerWidth(true));
		var c3nThisOffsetAsPercentage = 100 / ($thisChart.find('ul.c3_ul_row_groups').outerWidth(true) / $(this).position().left);
		var c3nThisCombinedValue = c3nThisOffsetAsPercentage + (c3nThisWidthAsPercentage / 2);
		c3aCentrePointsOfYearGroups.push(c3nThisCombinedValue);
		
	});
	// Work out how far apart the points should be
	var c3nDistanceApartYear = 100 / 4.75; // c3aYearlyTotals.length;
	// Build a string that creates the SVG
	var c3sSVGBuilderYear = '<svg class="c3_svg_line_chart_year" height="100%" width="100%">';
	// Loop the local data to create the lines
	for (var i = 0; i < c3aYearlyTotals.length - 1; i++) {
		// Convert the values to percentage
		var c3nThisValueAsPercentage = 100 - (parseInt(c3aYearlyTotals[i]) / c3nThisMaxY * 100);
		var c3nThisNextValueAsPercentage = 100 - (parseInt(c3aYearlyTotals[i + 1]) / c3nThisMaxY * 100);
		// Add the new line to the the svg builder
		c3sSVGBuilderYear += '<line data-thisvalue="' + c3aYearlyTotals[i] + '" data-nextvalue="' + c3aYearlyTotals[i + 1] + '" x1="' + c3aCentrePointsOfYearGroups[i] + '%" y1="' + c3nThisValueAsPercentage + '%" x2="' + c3aCentrePointsOfYearGroups[i + 1] + '%" y2="' + c3nThisNextValueAsPercentage + '%" style="stroke: var(--c3_red); transition: opacity 0.25s ease ' + (0.5 * i) + 's;" />';
	}
	c3sSVGBuilderYear += '</svg>';
	// Add the constructed SVG to the DOM
	$thisChart.children('div.c3_div_bar_positioner').append(c3sSVGBuilderYear);
	// Iterate the lines to set them up for the animation
	$thisChart.find('svg.c3_svg_line_chart_year line').each( function(i) {
		// Measure the line length so we can animate the the stroke dash array
		var c3nThisLineLength = parseInt($(this).get(0).getTotalLength()) * 1.1;
		// Add dynamic CSS properties to sequence the anmiation of each line to create a stroke path effect
		$(this).css({'stroke-dasharray': c3nThisLineLength, 'stroke-dashoffset': c3nThisLineLength, 'animation-delay': (i * 0.4) + 's'});
		
	});
	
	// Now we have to create the axes
	c3buildAxis($thisChart, 'right', c3nThisMaxY, 100, 'yearly');
	
}

function c3buildLineChartRolling(c3aLocalData, $thisChart) {
	
	// -------- BUILD QUARTERLY LINE -------- // 
	
	// Var to store the max value of the array
	var c3nThisMaxQ = 0;
	var c3nThisMaxY = 0;
	// Get the max value in the array
	for (var i = 0; i < c3aLocalData.length; i++) {
		if (parseInt(c3aLocalData[i][0]) > c3nThisMaxQ) {
			c3nThisMaxQ = parseInt(c3aLocalData[i][0]);
		}
	}
	// But ensure it's always at least 10 otherwise the graduations on the axes will produce decimals that get rounded up and down ausing apparent duplicates or uneven spacing
	if (c3nThisMaxQ < 10) { c3nThisMaxQ = 10 };
	// Round up the max to the nearest 100
	c3nThisMaxQ = c3roundAxes(c3nThisMaxQ);
	// Work out how far apart the points should be
	var c3nDistanceApart = 100 / (c3aLocalData.length - 4);
	// Build a string that creates the SVG
	var c3sSVGBuilder = '<svg class="c3_svg_line_chart" height="100%" width="100%">';
	// Loop the local data to create the lines
	for (var i = 4; i < c3aLocalData.length - 1; i++) {
		// Convert the values to percentage
		var c3nThisValueAsPercentage = 100 - (parseInt(c3aLocalData[i][0]) / c3nThisMaxQ * 100);
		var c3nThisNextValueAsPercentage = 100 - (parseInt(c3aLocalData[i + 1][0]) / c3nThisMaxQ * 100);
		// Add the new line to the the svg builder
		c3sSVGBuilder += '<line data-thisvalue="' + c3aLocalData[i][0] + '" data-nextvalue="' + c3aLocalData[i + 1][0] + '" x1="' + (c3nDistanceApart * (i - 4) + (c3nDistanceApart / 2)) + '%" y1="' + c3nThisValueAsPercentage + '%" x2="' + (c3nDistanceApart * ((i - 4) + 1) + (c3nDistanceApart / 2)) + '%" y2="' + c3nThisNextValueAsPercentage + '%" style="stroke: var(--c3_' + c3aLocalData[i][1] + '); transition: opacity 0.25s ease ' + (0.5 * i) + 's;" />';
	}
	c3sSVGBuilder += '</svg>';
	// Add the constructed SVG to the DOM
	$thisChart.children('div.c3_div_bar_positioner').append(c3sSVGBuilder);
	// Iterate the lines to set them up for the animation
	$thisChart.find('svg.c3_svg_line_chart line').each( function(i) {
		// Measure the line length so we can animate the the stroke dash array
		var c3nThisLineLength = parseInt($(this).get(0).getTotalLength()) * 1.1;
		// Add dynamic CSS properties to sequence the anmiation of each line to create a stroke path effect
		$(this).css({'stroke-dasharray': c3nThisLineLength, 'stroke-dashoffset': c3nThisLineLength, 'animation-delay': (i * 0.1) + 's'});
	});
	
	// Now we have to create the axes
	c3buildAxis($thisChart, 'right', c3nThisMaxQ, 100, 'quarterly');
	
	// -------- BUILD YEARLY LINE -------- // 
	
	// We need to extrapolate the yearly totals as we iterate the quarters
	var c3aYearlyTotals = [];
	var c3sCurrentYear = 'None';
	
	// Loop over the local data starting at 4 (to allow for the first thee quarters buffer)
	for (var i = 4; i < c3aLocalData.length; i++) {
		console.log('c3aLocalData[i][0]: ' + c3aLocalData[i][0]);
		c3aYearlyTotals.push((parseFloat(c3aLocalData[i][0]) + parseFloat(c3aLocalData[i - 1][0]) + parseFloat(c3aLocalData[i - 2][0]) + parseFloat(c3aLocalData[i - 3][0])) / 4);
	}
	
	console.log('c3aYearlyTotals: ' + c3aYearlyTotals);
	
	// Get the max value in the yearly array
	for (var i = 0; i < c3aYearlyTotals.length; i++) {
		if (parseInt(c3aYearlyTotals[i]) > c3nThisMaxY) {
			c3nThisMaxY = parseInt(c3aYearlyTotals[i]);
		}
	}
	// Round up the max to the nearest 100
	// c3nThisMaxY = Math.ceil(c3nThisMaxY / 1000) * 1000;
	c3nThisMaxY = c3roundAxes(c3nThisMaxY);
	
	console.log('c3nThisMaxY: ' + c3nThisMaxY);
	
	// Build a string that creates the SVG
	var c3sSVGBuilderYear = '<svg class="c3_svg_line_chart_year" height="100%" width="100%">';
	// Loop the local data to create the lines
	for (var i = 0; i < c3aYearlyTotals.length - 1; i++) {
		// Convert the values to percentage
		var c3nThisValueAsPercentage = 100 - (parseInt(c3aYearlyTotals[i]) / c3nThisMaxY * 100);
		var c3nThisNextValueAsPercentage = 100 - (parseInt(c3aYearlyTotals[i + 1]) / c3nThisMaxY * 100);
		// Add the new line to the the svg builder
		c3sSVGBuilderYear += '<line data-thisvalue="' + c3aYearlyTotals[i] + '" data-nextvalue="' + c3aYearlyTotals[i + 1] + '" x1="' + (c3nDistanceApart * (i) + (c3nDistanceApart / 2)) + '%" y1="' + c3nThisValueAsPercentage + '%" x2="' + (c3nDistanceApart * ((i) + 1) + (c3nDistanceApart / 2)) + '%" y2="' + c3nThisNextValueAsPercentage + '%" style="stroke: var(--c3_red); transition: opacity 0.25s ease ' + (0.5 * i) + 's;" />';
	}
	c3sSVGBuilderYear += '</svg>';
	// Add the constructed SVG to the DOM
	$thisChart.children('div.c3_div_bar_positioner').append(c3sSVGBuilderYear);
	// Iterate the lines to set them up for the animation
	$thisChart.find('svg.c3_svg_line_chart_year line').each( function(i) {
		// Measure the line length so we can animate the the stroke dash array
		var c3nThisLineLength = parseInt($(this).get(0).getTotalLength()) * 1.1;
		// Add dynamic CSS properties to sequence the anmiation of each line to create a stroke path effect
		$(this).css({'stroke-dasharray': c3nThisLineLength, 'stroke-dashoffset': c3nThisLineLength, 'animation-delay': (i * 0.1) + 's'});
		
	});
	
	// Now we have to create the axes
	c3buildAxis($thisChart, 'right', c3nThisMaxY, 100, 'yearly');
	
}

function c3keyHighlight($thisElement, c3bIsTriggered) {
	// Get local chart
	var $thisChart = $thisElement.closest('div.c3_chart');
	// Are we in a yearly or quaretrly view?
	var c3bIsYearly = ($thisChart.hasClass('c3_div_chart_year') || $thisChart.hasClass('c3_div_chart_rolling_year')) ? true : false;
	// Get the value of the left axis label so we cn work out what denominations we need
	var c3sThisLeftAxisTitle = $thisChart.children('table').attr('data-yaxisleft');
	var c3sDenomination = 'bn';
	// Look in the left axis label to determine which denomination to send to the display value function
	if (c3sThisLeftAxisTitle.indexOf('%') > -1) {
		c3sDenomination = '%';
	}
	// If we're NOT already selected
	if (!$thisElement.hasClass('selected') || c3bIsTriggered) {
		// Deselect everything
		$thisChart.find('small.c3_small_key ul li').removeClass('selected');
		$thisChart.find('div.c3_div_bar_actual_popup_positioner').fadeOut();
		$thisChart.find('div.c3_div_bar_actual_popup_positioner_line').fadeOut();
		// Mark this item as selected
        if (!c3bIsTriggered) {
		  $thisElement.addClass('selected');
        }
		// Highlight the selected key element by supressing all but the one we've selected
		$thisChart.find('div.c3_div_chart_bar_actual').each( function() {
			// Check if the looped element has the same index as the clicked element
			if (($(this).index() - 1) != $thisElement.index()) {
                if (!c3bIsTriggered) {
				    $(this).css('opacity', '0.2');
                } else {
                    $(this).css('opacity', '1');
                }
			} else {
				$(this).css('opacity', '1.0');
				// Get value to display from appropriate place based on whether this is a yearly or quarterly view
				var c3thisValue = 'Not found';
				if (c3bIsYearly) {
					c3thisValue = $(this).parent().attr('data-thisyearsectortotals').split(',')[$(this).index() - 1];
				} else {
					c3thisValue = $(this).children('span').text();
				}
				// Create the pop up for the highlighted bars
				if ($(this).children('div.c3_div_bar_actual_popup_positioner').length == 0) {
					$(this).append('<div class="c3_div_bar_actual_popup_positioner"><div class="c3_div_bar_actual_popup_detail">' + c3displayValue(c3thisValue, c3sDenomination) + '</div></div>');
				} else {
                    if (!c3bIsTriggered) {
					   $(this).children('div.c3_div_bar_actual_popup_positioner').fadeIn();
                    }
					$(this).find('div.c3_div_bar_actual_popup_detail').text(c3displayValue(c3thisValue, c3sDenomination));
				}
				
				var c3nTopPositionCorrection = $(this).parent().outerWidth(false) - $('div.c3_div_bar_positioner').outerHeight(false);
				
				console.log('--------------------------------------');
				console.log('$(div.c3_div_bar_rotator).outerWidth(false): ' + $('div.c3_div_bar_rotator').outerWidth(false));
				console.log('$(div.c3_div_bar_positioner).outerHeight(false): ' + $('div.c3_div_bar_positioner').outerHeight(false));
				console.log('c3nTopPositionCorrection: ' + c3nTopPositionCorrection);
				console.log('$(this).position().top: ' + $(this).position().top);
				
				// Determine if we need to invert the label
				if (($(this).position().top - c3nTopPositionCorrection) < 100) {
					$(this).children('div.c3_div_bar_actual_popup_positioner').addClass('c3_div_popup_positioner_down');
				} else {
					$(this).children('div.c3_div_bar_actual_popup_positioner').removeClass('c3_div_popup_positioner_down');
				}
				
				
				
			}
		});
		
	} else {
		// Deselect everything
		$thisChart.find('small.c3_small_key ul li').removeClass('selected');
		$thisChart.find('div.c3_div_chart_bar_actual').css('opacity', '1.0');
		$thisChart.find('div.c3_div_bar_actual_popup_positioner').fadeOut();
		$thisChart.find('div.c3_div_bar_actual_popup_positioner_line').fadeOut();
	}
		
}

function c3keyHighlightLine($thisElement, c3bIsTriggered) {
	
	// Get local chart
	var $thisChart = $thisElement.closest('div.c3_chart');
	// Are we in a yearly or quaretrly view?
	var c3bIsYearly = ($thisChart.hasClass('c3_div_chart_year') || $thisChart.hasClass('c3_div_chart_rolling_year')) ? true : false;
	var c3IDBuilder = 'quarterly';
	// Establish which line we need to focus on
	var $thisSVG = $thisChart.find('svg.c3_svg_line_chart');
	if (c3bIsYearly) {
		$thisSVG = $thisChart.find('svg.c3_svg_line_chart_year');
		c3IDBuilder = 'yearly';
	}
	// Make sure all bars are visible
	$thisChart.find('div.c3_div_chart_bar_actual').css('opacity', '1');
	// If we're NOT already selected
	if (!$thisElement.hasClass('selected') || c3bIsTriggered) {
		// Deselect everything
		$thisChart.find('small.c3_small_key ul li').removeClass('selected');
		$thisChart.find('div.c3_div_bar_actual_popup_positioner').fadeOut();
		$thisChart.find('div.c3_div_bar_actual_popup_positioner_line').fadeOut();
		// Mark this item as selected
		$thisElement.addClass('selected');
		// Loop over all the lines in the SVG
		$thisSVG.children('line').each( function(i) {
			
			var c3thisValue = 'Not found';
			var c3nextValue = 'Not found';
			c3thisValue = $(this).attr('data-thisvalue');
			c3nextValue = $(this).attr('data-nextvalue');
			
			// Get the coordinates of the current line so we can use them to position the pop up
			var c3sThisX1Coord = $(this).attr('x1');
			var c3sThisY1Coord = $(this).attr('y1');
			var c3sThisX2Coord = $(this).attr('x2');
			var c3sThisY2Coord = $(this).attr('y2');
			
			// START HERE AND TRANSLATE THE COORDINATES TO POP-UPS
			
			var c3sThisID = 'c3_line_pop_up_' + c3IDBuilder + '_' + i;
			
			var c3sPopUpOrientation = 'c3_div_popup_positioner_up';
			// Determine if we need to invert the label
			if (parseInt(c3sThisY1Coord) < 10) {
				c3sPopUpOrientation = 'c3_div_popup_positioner_down';
			}
			
			// Add the pop-up
			if ($thisChart.find('div.c3_div_bar_positioner').children('div#' + c3sThisID).length == 0) {
				$thisChart.find('div.c3_div_bar_positioner').append('<div id="' + c3sThisID + '" class="c3_div_bar_actual_popup_positioner_line ' + c3sPopUpOrientation + '" style="top: ' + c3sThisY1Coord + '; left: calc(50px + ((100% - 50px - 50px) * ' + (parseFloat(c3sThisX1Coord) / 100) + '));"><div class="c3_div_bar_actual_popup_detail_line">' + c3displayValue(c3thisValue, 'none') + '</div></div>');
				$thisChart.find('div.c3_div_bar_positioner').children('div#' + c3sThisID).delay(50 * i).fadeIn();
				// If this is the last line in the sequence, we have to add an addiitonal popup
				if (i == $thisSVG.children('line').length - 1) {
					$thisChart.find('div.c3_div_bar_positioner').append('<div id="' + c3sThisID + '_end" class="c3_div_bar_actual_popup_positioner_line ' + c3sPopUpOrientation + '" style="top: ' + c3sThisY2Coord + '; left: calc(50px + ((100% - 50px - 50px) * ' + (parseFloat(c3sThisX2Coord) / 100) + '));"><div class="c3_div_bar_actual_popup_detail_line">' + c3displayValue(c3nextValue, 'none') + '</div></div>');
					$thisChart.find('div.c3_div_bar_positioner').children('div#' + c3sThisID + '_end').delay(50 * (i + 1)).fadeIn();
				}
			} else {
				$thisChart.find('div.c3_div_bar_positioner').children('div#' + c3sThisID).delay(50 * i).fadeIn();
				$thisChart.find('div.c3_div_bar_positioner').children('div#' + c3sThisID + '_end').delay(50 * (i + 1)).fadeIn();
               
			}
			
		});
		
	} else {
		// Deselect everything
		$thisChart.find('small.c3_small_key ul li').removeClass('selected');
		$thisChart.find('div.c3_div_bar_actual_popup_positioner').fadeOut();
		$thisChart.find('div.c3_div_bar_actual_popup_positioner_line').fadeOut();
	}
		
}

function c3displayValue(c3nValue, c3sDenomination) {
	
	var c3sDisplayValue = '';
	
	if (c3sDenomination == 'bn') {
		c3nValue = c3nValue / 1000000000;
		c3sDisplayValue = '$' + c3nValue.toFixed(2) + c3sDenomination;
	} else if (c3sDenomination == '%') {
		c3sDisplayValue = c3nValue + '%';  
	} else if (c3sDenomination == 'none') {
		c3sDisplayValue = c3nValue;  
	}
	
	return(c3sDisplayValue);
}

function c3roundAxes(c3nLocalMaxY) {
	
	// Round up the yearly max based on the frame of reference
	if (c3nLocalMaxY > 10000000000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 10000000000) * 10000000000;
	} else if (c3nLocalMaxY > 1000000000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 1000000000) * 1000000000;
	} else if (c3nLocalMaxY > 100000000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 100000000) * 100000000;
	} else if (c3nLocalMaxY > 10000000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 10000000) * 10000000;
	} else if (c3nLocalMaxY > 1000000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 1000000) * 1000000;
	} else if (c3nLocalMaxY > 100000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 100000) * 100000;
	} else if (c3nLocalMaxY > 1000) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 1000) * 1000;
	} else if (c3nLocalMaxY > 100) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 100) * 100;
	} else if (c3nLocalMaxY > 10) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 10) * 10;
	} else if (c3nLocalMaxY > 1) {
		c3nLocalMaxY = Math.ceil(c3nLocalMaxY / 1) * 1;
	}
	
	return(c3nLocalMaxY);
	
}

function c3roundAxisLabel(c3nLocalMax, c3axisValue) {
	
	var c3nRoundToNearest = c3nLocalMax / 10;
	
	// Round up the yearly max based on the frame of reference
	if (c3nLocalMax > 10000000000) {
		c3nLocalMax = Math.ceil(c3axisValue / 1000000000);
	} else if (c3nLocalMax > 1000000000) {
		c3nLocalMax = (c3axisValue / 1000000000).toFixed(1);
	} else if (c3nLocalMax > 100000000) {
		c3nLocalMax = Math.ceil(c3axisValue / 1000000);
	} else if (c3nLocalMax > 10000000) {
		c3nLocalMax = Math.ceil(c3axisValue / 1000000);
	} else if (c3nLocalMax > 1000000) {
		c3nLocalMax = Math.ceil(c3axisValue / 1000000);
	} else if (c3nLocalMax > 100000) {
		c3nLocalMax = Math.ceil(c3axisValue / 1000);
	} else if (c3nLocalMax > 1000) {
		c3nLocalMax = Math.ceil(c3axisValue / 1000);
	} else if (c3nLocalMax > 100) {
		c3nLocalMax = Math.ceil(c3axisValue / 1);
	} else if (c3nLocalMax > 10) {
		c3nLocalMax = Math.ceil(c3axisValue / 1);
	} else if (	c3nLocalMax > 1) {
		c3nLocalMax = Math.ceil(c3axisValue);
	}
	
	return(c3nLocalMax);
	
}

function c3slewCarousel($thisElement) {
	// Deselect all other tabs
	$thisElement.closest('section').find('nav ul li a').removeClass('c3_selected');
	// Mark this tab as selected
	$thisElement.addClass('c3_selected');
	// Reference to local carousel
	var $thisCarousel = $thisElement.closest('section').find('div.c3_div_carousel_scroller');
	// Get the width of the carousel container in pixels
	var c3nPixelWidth = $('div.c3_div_carousel_container').outerWidth(true);
	// Get one third of the width so we know how much to scroll by each time
	var c3nOneThird = c3nPixelWidth / 3;
	
	console.log('c3nPixelWidth: ' + c3nPixelWidth);
	console.log('c3nOneThird: ' + c3nOneThird);
	
	$thisCarousel.animate({'scrollLeft': (c3nOneThird * $thisElement.parent().index()) + 'px'}, 500);
}






