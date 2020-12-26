-- Made By Aizik#5555
ESX = nil 
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end) 

RegisterCommand('redeem', function(source, args, rawCommand)
    local encode = rawCommand:sub(8) -- IF YOU CHANGE COMMAND YOU MUST CHANGE THAT AS WELL, IF YOU DONT KNOW HOW TO CHNAGE THAT, GO LEARN LUA BY NOAM BEST DEVELOPER
    MySQL.Async.fetchAll('SELECT * FROM codes WHERE code = @playerCode', {['@playerCode'] = encode}, function(result)
        local xPlayer = ESX.GetPlayerFromId(source)
        local code = result[1].code
        local type = result[1].type
        local amount = result[1].amount
        if type == 'money' then
            xPlayer.addAccountMoney('bank', amount)
            TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Succsesfully Redeemed A Code Of ' .. amount .. '₪', length = 5000, style = { ['background-color'] = ' rgb(21, 100, 15, 0.95)', ['color'] = '#fff' } })
        else
            xPlayer.addInventoryItem(type, amount)
            TriggerClientEvent('mythic_notify:client:SendAlert', source, { type = 'success', text = 'Succsesfully Redeemed A Code Of x' .. amount .. " ".. type , length = 5000, style = { ['background-color'] = ' rgb(21, 100, 15, 0.95)', ['color'] = '#fff' } })
        end
        MySQL.Async.fetchAll('DELETE FROM codes WHERE code = @playerCode', {['@playerCode'] = encode}, function(result)
        end)
    end)

end)
-- Made By Aizik#5555